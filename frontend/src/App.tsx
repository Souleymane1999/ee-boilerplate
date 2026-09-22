import { useEffect, useState } from "react";
import "./App.css";
import { fetchHealth } from "./lib/api";

type Status = "loading" | "ok" | "error";

/**
 * Minimal example component demonstrating a call to the Rails API
 * backend's health check endpoint (GET /up).
 */
function App() {
  const [status, setStatus] = useState<Status>("loading");
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth()
      .then((health) => {
        setStatus("ok");
        setCheckedAt(health.timestamp);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return (
    <div id="app">
      <h1>EE Boilerplate</h1>
      <p>
        Frontend React + Vite + TypeScript, connecté à un backend Rails API.
      </p>

      <div className="status-card">
        <h2>Statut du backend</h2>
        <p>
          <span className={`status-badge ${status}`}>
            {status === "loading" && "Vérification..."}
            {status === "ok" && "Backend disponible"}
            {status === "error" && "Backend indisponible"}
          </span>
        </p>
        {checkedAt && <p>Dernière vérification : {checkedAt}</p>}
      </div>
    </div>
  );
}

export default App;
