// src/wasm.ts
// Single dynamic import so TS + Vite don’t fuss about .js + .wasm.
// Also avoids top-level await inside modules that might be prebundled.

let _ready: Promise<void> | null = null;

export function initWasm(): Promise<void> {
  if (_ready) return _ready;

  _ready = (async () => {
    // 1) Load the generated glue (wasm-pack output)
    const wasm = await import("./pkg/stylizer_wasm.js");

    // 2) Call its default export (the async initializer)
    //    Give it an explicit URL to the .wasm so it works in dev & build.
    const wasmUrl = new URL("./pkg/stylizer_wasm_bg.wasm", import.meta.url);
    // ts-expect-error: default is the init function from wasm-pack
    await wasm.default(wasmUrl);

    // 3) Optional: better Rust panics in console
    if (typeof wasm.set_panic_hook === "function") {
      wasm.set_panic_hook();
    }

    // 4) Quick sanity log
    if (typeof wasm.hello === "function") {
      console.log("[WASM] hello():", wasm.hello());
    } else {
      console.log("[WASM] glue loaded. Exports:", Object.keys(wasm));
    }
  })();

  return _ready;
}
