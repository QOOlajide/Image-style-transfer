// Import the wasm-pack JS glue and our exported function from /public/pkg.
// NOTE: This path works at runtime because Vite serves /public at the web root (/).
import init, { hello } from '/pkg/stylizer_wasm.js'; // Loader + export from the built wasm package

// Initialize WASM once; call from your React app on startup.
export async function initWasm(): Promise<void> {     // Async: we fetch/instantiate the .wasm
  await init('/pkg/stylizer_wasm_bg.wasm');           // Explicitly point at the compiled .wasm file
  const msg = hello();                                 // Call into Rust to get "wasm online"
  console.log('[WASM]', msg);                          // Log proof-of-life so you can verify wiring
}

