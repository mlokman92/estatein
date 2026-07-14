import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { Button, Card, Field, Spinner, TextInput } from "../components/ui";

export default function Login() {
  const { session, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="grid size-11 place-items-center rounded-xl bg-purple">
            <Building2 className="size-6 text-white" />
          </span>
          <h1 className="text-xl font-semibold">Estatein CMS</h1>
          <p className="text-sm text-muted">Sign in to manage site content</p>
        </div>
        <Card>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Field label="Email" required>
              <TextInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </Field>
            <Field label="Password" required>
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Field>
            {error && (
              <p className="rounded-[var(--radius-btn)] border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Button type="submit" disabled={submitting}>
              {submitting && <Spinner className="size-4" />}
              Sign in
            </Button>
          </form>
        </Card>
        <p className="mt-4 text-center text-xs text-muted">
          Accounts are created in the Supabase dashboard. There is no public sign-up.
        </p>
      </div>
    </div>
  );
}
