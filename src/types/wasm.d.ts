// Declare the ESM module that wasm-pack emits into /public/pkg.
declare module '/pkg/stylizer_wasm.js' {                             // Absolute path (Vite serves /public at /)
  export default function init(
    input?: RequestInfo | URL | Response | BufferSource | WebAssembly.Module // Optional explicit WASM location
  ): Promise<any>;                                                   // Resolves when WASM is ready

  export function hello(): string;                                   // Our Rust export (hello -> "wasm online")
}

