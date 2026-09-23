import { useEffect, useState } from "react";
import { fetchHealth } from "./lib/api";

type Status = "loading" | "ok" | "error";

const badgeStyles: Record<Status, string> = {
  loading: "bg-neutral-100 text-neutral-600",
  ok: "bg-success-bg text-success",
  error: "bg-danger-bg text-danger",
};

const badgeLabels: Record<Status, string> = {
  loading: "Vérification...",
  ok: "Backend disponible",
  error: "Backend indisponible",
};

/**
 * Minimal example component demonstrating a call to the Rails API
 * backend's health check endpoint (GET /up), styled with Tailwind using
 * the design system's brand tokens (see DESIGN.md).
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
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-ink">EE Boilerplate</h1>
      <p className="mt-2 text-neutral-600">
        Frontend React + Vite + TypeScript, connecté à un backend Rails API.
      </p>

      <div className="mt-4 rounded-lg border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-brand-ink">
          Statut du backend
        </h2>
        <p className="mt-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${badgeStyles[status]}`}
          >
            {badgeLabels[status]}
          </span>
        </p>
        {checkedAt && (
          <p className="mt-2 text-sm text-neutral-500">
            Dernière vérification : {checkedAt}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
