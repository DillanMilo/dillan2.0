import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

export function render(): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    let settled = false;

    output.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    output.on("end", () => {
      settled = true;
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    output.on("error", reject);

    const { pipe, abort } = renderToPipeableStream(<App />, {
      onAllReady() {
        pipe(output);
      },
      onShellError(error) {
        settled = true;
        reject(error);
      },
      onError(error) {
        console.error("Prerender error:", error);
      },
    });

    setTimeout(() => {
      if (!settled) abort();
    }, 15_000).unref();
  });
}
