import { useEffect, useState } from 'react';
import { initWasm } from './wasm';

export default function App() {
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      try {
        await initWasm();
        setReady(true);
      } catch (e: any) {
        setErr(String(e?.message ?? e));
        setReady(false);
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Rust + WASM + Vite</h1>
      <p>Status: <strong>{ready ? 'Ready ✅' : 'Loading…'}</strong></p>
      {err && (
        <pre style={{ color: 'crimson', whiteSpace: 'pre-wrap', marginTop: 12 }}>
          Error: {err}
        </pre>
      )}
      <p style={{ marginTop: 12 }}>
        Open DevTools → Console and look for logs starting with <code>[WASM]</code>.
      </p>
    </main>
  );
}
