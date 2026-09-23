import { useState, type FormEvent } from "react";
import ifuturLogo from "./assets/ifutur-logo.png";
import { InvalidCredentialsError, loginUser, type AuthUser } from "./lib/api";

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

/**
 * Login screen styled with the iFutur / Delta Force design tokens
 * (see DESIGN.md). Talks to the real backend endpoint POST /login
 * (Devise + devise-jwt — backend/app/controllers/users/sessions_controller.rb).
 */
function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { user, token } = await loginUser(email, password);
      localStorage.setItem("auth_token", token);
      onLoginSuccess(user);
    } catch (err) {
      setError(
        err instanceof InvalidCredentialsError
          ? err.message
          : "Une erreur est survenue. Réessayez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-25 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <img src={ifuturLogo} alt="iFutur" className="h-8 w-auto" />

        <h1 className="mt-6 text-xl font-bold text-brand-ink">Connexion</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Accédez à votre espace iFutur.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700"
            >
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@ifutur.com"
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-brand-ink shadow-[inset_0_1px_2px_rgba(14,17,16,0.06)] outline-none placeholder:text-neutral-400 focus:border-brand-lime-600 focus:ring-3 focus:ring-brand-lime/35"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-brand-ink shadow-[inset_0_1px_2px_rgba(14,17,16,0.06)] outline-none placeholder:text-neutral-400 focus:border-brand-lime-600 focus:ring-3 focus:ring-brand-lime/35"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-md border border-brand-lime-600 bg-brand-lime px-4 py-2.5 text-sm font-semibold text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:bg-brand-lime-600 active:bg-brand-lime-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
