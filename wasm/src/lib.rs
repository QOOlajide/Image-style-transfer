// Bring wasm-bindgen macros and JsValue into scope for JS <-> Rust interop.
use wasm_bindgen::prelude::*;

// Run once on module load: installs a panic hook so Rust panics are readable in the console.
#[wasm_bindgen(start)]                 // Mark as start function (called after WASM instantiation)
pub fn set_panic_hook() {              // No args, no return (JS ignores result)
    console_error_panic_hook::set_once(); // Install the panic hook (safe to call multiple times)
}

// Tiny proof-of-life function exported to JS.
#[wasm_bindgen]                        // Expose to JS
pub fn hello() -> String {             // No args, returns Rust String (becomes JS string)
    "wasm online".to_string()          // Construct and return the message
}

