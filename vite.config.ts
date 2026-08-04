import { defineConfig, loadEnv, type Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'
import { verifyTurnstile } from './api/contact-security'
import { projects, serviceAreas, services, siteUrl } from './src/content/siteData'

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

async function readJson(req: IncomingMessage) {
  const chunks: Buffer[] = []
  let size = 0

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > 12_000) throw new Error('Request body too large')
    chunks.push(buffer)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

function localContactApiPlugin(): Plugin {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        const origin = req.headers.origin
        if (origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173') {
          res.setHeader('Access-Control-Allow-Origin', origin)
        }
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 200
          res.end()
          return
        }

        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Method not allowed' })
          return
        }

        if (req.headers['content-type']?.toLowerCase().startsWith('application/json') !== true) {
          sendJson(res, 415, { error: 'Content-Type must be application/json' })
          return
        }

        try {
          const body = await readJson(req) as Record<string, unknown>
          if (typeof body.website === 'string' && body.website.length > 0) {
            sendJson(res, 200, { success: true })
            return
          }

          const verification = await verifyTurnstile(body.turnstileToken, req.socket.remoteAddress)
          if (!verification.ok) {
            sendJson(res, verification.reason === 'invalid' ? 403 : 503, { error: 'Human verification failed' })
            return
          }

          const { sendContactEmail } = await server.ssrLoadModule('/api/send-email-core.ts') as typeof import('./api/send-email-core')
          const result = await sendContactEmail(body)
          sendJson(res, result.status, result.body)
        } catch (error) {
          console.error('Local contact API error:', error)
          sendJson(res, 500, { error: 'Internal server error' })
        }
      })
    },
  }
}

function structuredDataHtmlPlugin(): Plugin {
  const personId = `${siteUrl}#person`
  const organizationId = `${siteUrl}#organization`
  const websiteId = `${siteUrl}#website`
  const serviceAreaEntities = serviceAreas.map((name) => ({
    '@type': name === 'Montgomery County' ? 'AdministrativeArea' : 'City',
    name,
  }))
  const serviceEntities = services.map((service) => ({
    '@type': 'Service',
    '@id': `${siteUrl}#service-${service.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`,
    name: service.name,
    alternateName: service.shortName,
    serviceType: service.shortName,
    description: service.description,
    url: `${siteUrl}#info`,
    provider: { '@id': organizationId },
    areaServed: serviceAreaEntities,
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small businesses, founders, and independent teams',
    },
  }))
  const serviceReferences = serviceEntities.map((service) => ({
    '@id': service['@id'],
  }))

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Dillan Milosevich',
        jobTitle: 'Software Developer',
        url: siteUrl,
        image: `${siteUrl}brand/dillan-logo-512.webp`,
        sameAs: [
          'https://www.linkedin.com/in/dillan-milosevich-9a817891/',
          'https://twitter.com/dillanx1x',
          'https://github.com/DillanMilo',
        ],
        worksFor: { '@id': organizationId },
        knowsAbout: serviceReferences,
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Developer',
          occupationLocation: { '@type': 'State', name: 'Texas' },
          skills: services.map((service) => service.shortName),
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: 'Dillan Milosevich',
        description:
          'Custom web development, AI automation, workflow automation, and small business software in The Woodlands, Tomball, Houston, and Montgomery County.',
        publisher: { '@id': organizationId },
        about: [{ '@id': personId }, { '@id': organizationId }],
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}#webpage`,
        url: siteUrl,
        name: 'Dillan Milosevich | Web Developer in The Woodlands TX',
        description:
          'Custom websites, AI automation, and small business software by Dillan Milosevich, serving The Woodlands, Tomball, Houston, and Montgomery County.',
        isPartOf: { '@id': websiteId },
        about: [{ '@id': personId }, { '@id': organizationId }],
        mainEntity: [{ '@id': personId }, { '@id': organizationId }],
        mentions: [
          ...serviceReferences,
          { '@id': `${siteUrl}#projects` },
        ],
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${siteUrl}og-image.png`,
          width: 1200,
          height: 630,
        },
        inLanguage: 'en-US',
        dateModified: '2026-07-20',
      },
      {
        '@type': 'ProfessionalService',
        '@id': organizationId,
        name: 'Dillan Milosevich Software Development Services',
        url: siteUrl,
        logo: `${siteUrl}brand/dillan-logo-512.webp`,
        image: `${siteUrl}og-image.png`,
        description:
          'Custom websites, business automation, AI-powered tools, and small business software for local companies.',
        founder: { '@id': personId },
        telephone: '+1-281-210-8139',
        email: 'dillan@creativecurrents.io',
        areaServed: serviceAreaEntities,
        knowsAbout: serviceReferences,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'project inquiries',
          telephone: '+1-281-210-8139',
          email: 'dillan@creativecurrents.io',
          availableLanguage: 'English',
        },
        sameAs: [
          'https://www.linkedin.com/in/dillan-milosevich-9a817891/',
          'https://twitter.com/dillanx1x',
          'https://github.com/DillanMilo',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software development services',
          itemListElement: serviceEntities.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@id': service['@id'] },
          })),
        },
      },
      ...serviceEntities,
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}#projects`,
        name: 'Selected web development and software projects',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': project.schemaType,
            name: project.title,
            url: project.schemaUrl,
            description: project.description,
            creator: { '@id': personId },
            ...(project.schemaType === 'SoftwareApplication'
              ? {
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                }
              : {}),
          },
        })),
      },
    ],
  }

  return {
    name: 'structured-data-html',
    transformIndexHtml(html) {
      const withoutExistingSchema = html.replace(
        /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        '',
      )

      return {
        html: withoutExistingSchema,
        tags: [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(structuredData),
            injectTo: 'head',
          },
        ],
      }
    },
  }
}

function googleAnalyticsHtmlPlugin(): Plugin {
  return {
    name: 'google-analytics-html',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: {
            src: '/analytics.js',
            defer: true,
          },
          injectTo: 'head',
        }
      ]
    },
  }
}

export default defineConfig(({ mode, isSsrBuild }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [
      localContactApiPlugin(),
      structuredDataHtmlPlugin(),
      react(),
      tailwindcss(),
      ...(mode === 'production' ? [googleAnalyticsHtmlPlugin()] : []),
      ...(!isSsrBuild ? [compression()] : []) // Only compress deployable client assets.
    ],
    build: {
      minify: 'esbuild', // Ensure minification using esbuild.
      target: 'es2015',  // More compatible target for better browser support.
      rollupOptions: isSsrBuild
        ? undefined
        : {
            output: {
              manualChunks: {
                vendor: ['react', 'react-dom'], // Split vendor chunks.
              }
            }
          },
      chunkSizeWarningLimit: 500, // Stricter chunk size limits
      sourcemap: false, // Disable sourcemaps in production for smaller bundles
    },
    optimizeDeps: {
      include: ['react', 'react-dom'], // Pre-bundle dependencies
    },
    esbuild: {
      // Remove console logs in production
      pure: ['console.log', 'console.warn'],
      drop: ['console', 'debugger'],
    },
    publicDir: 'public', // Make sure this is set
    server: {
      fs: {
        strict: true
      }
    },
  }
})
