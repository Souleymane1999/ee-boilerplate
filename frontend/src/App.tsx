import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import { fetchHealth, logoutUser, type AuthUser } from "./lib/api";

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

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
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

  async function handleLogout() {
    const token = localStorage.getItem("auth_token");
    if (token) {
      await logoutUser(token).catch(() => {
        // Best-effort revocation — the token still gets dropped locally below.
      });
    }
    localStorage.removeItem("auth_token");
    setUser(null);
  }

  if (!user) {
    return <LoginPage onLoginSuccess={setUser} />;
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-ink">EE Boilerplate</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-xs hover:bg-neutral-50"
        >
          Se déconnecter
        </button>
      </div>
      <p className="mt-2 text-neutral-600">
        Connecté en tant que <span className="font-medium">{user.email}</span>
        .
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
