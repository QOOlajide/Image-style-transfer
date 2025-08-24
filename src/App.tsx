import { useEffect, useState } from 'react';  // React hooks for lifecycle + state
import { initWasm } from './wasm';            // Our WASM initializer

export default function App() {               // Root component
  const [ready, setReady] = useState(false);  // Track WASM init status for the UI

  useEffect(() => {                           // Run once on mount
    (async () => {
      try {
        await initWasm();                     // Load + init the .wasm module
        setReady(true);                       // Flip UI state on success
      } catch (e) {
        console.error('WASM init failed:', e);// Helpful console error on failure
        setReady(false);                      // Keep UI honest if init fails
      }
    })();
  }, []);                                     // Empty deps => only once

  return (                                    // Render minimal status UI
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Rust + WASM + Vite</h1>
      <p>Status: <strong>{ready ? 'Ready ✅' : 'Loading…'}</strong></p>
      <p>Open console and look for <code>[WASM] wasm online</code>.</p>
    </main>
  );
}

