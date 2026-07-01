import { defineConfig, loadEnv, type Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

const GA_MEASUREMENT_ID = 'G-SL5CG1FVGQ'

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

async function readJson(req: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

function localContactApiPlugin(): Plugin {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
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

        try {
          const { sendContactEmail } = await server.ssrLoadModule('/api/send-email-core.ts') as typeof import('./api/send-email-core')
          const result = await sendContactEmail(await readJson(req))
          sendJson(res, result.status, result.body)
        } catch (error) {
          console.error('Local contact API error:', error)
          sendJson(res, 500, { error: 'Internal server error' })
        }
      })
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
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: [
            'window.dataLayer = window.dataLayer || [];',
            'function gtag(){dataLayer.push(arguments);}',
            "gtag('js', new Date());",
            `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });`,
          ].join('\n'),
          injectTo: 'head',
        },
      ]
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [
      localContactApiPlugin(),
      react(),
      tailwindcss(),
      ...(mode === 'production' ? [googleAnalyticsHtmlPlugin()] : []),
      compression() // Add Gzip compression for production builds.
    ],
    build: {
      minify: 'esbuild', // Ensure minification using esbuild.
      target: 'es2015',  // More compatible target for better browser support.
      rollupOptions: {
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
