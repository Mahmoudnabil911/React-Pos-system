import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { login, addToast } = useAppStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@pos.com");
  const [password, setPassword] = useState("securePass123");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password, rememberMe);
      addToast(
        "success",
        t("toast.auth.loginSuccess") || "Logged in successfully!",
      );
      navigate("/dashboard");
    } catch {
      addToast("error", t("toast.auth.loginError") || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="animate-fade-in-up auth-card"
      style={{
        background: 'rgb(var(--bg-card))',
        padding: '3rem 2.5rem',
        borderRadius: '1.5rem',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.08)',
        border: '1px solid rgb(var(--border-primary))',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "var(--gradient-primary)",
            borderRadius: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 10px 25px -5px rgb(99 102 241 / 0.4)",
          }}
        >
          <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1
          style={{
            margin: "0 0 0.5rem",
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "rgb(var(--text-primary))",
            letterSpacing: "-0.02em",
          }}
        >
          {t("auth.signIn") || "Sign In"}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "0.9375rem",
            color: "rgb(var(--text-secondary))",
            lineHeight: 1.5,
          }}
        >
          {t("auth.signInSubtitle") ||
            "Welcome back! Please sign in to continue."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {/* Email */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "rgb(var(--text-primary))",
            }}
          >
            {t("auth.email") || "Email"}
          </label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              background: "rgb(var(--bg-primary))",
              border: `2px solid ${submitted && !email ? "rgb(var(--accent-danger))" : "transparent"}`,
              borderRadius: "1rem",
              boxShadow:
                "inset 0 2px 4px rgb(0 0 0 / 0.02), 0 0 0 1px rgb(var(--border-primary))",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0 2px rgb(var(--accent-primary) / 0.2), 0 0 0 1px rgb(var(--accent-primary))";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 0 2px 4px rgb(0 0 0 / 0.02), 0 0 0 1px rgb(var(--border-primary))";
            }}
          >
            <div
              style={{
                width: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "rgb(var(--text-tertiary))",
              }}
            >
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder") || "admin@pos.com"}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                padding: "0.875rem 1rem 0.875rem 0",
                fontSize: "0.9375rem",
                color: "rgb(var(--text-primary))",
                fontFamily: "var(--font-sans)",
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "rgb(var(--text-primary))",
            }}
          >
            {t("auth.password") || "Password"}
          </label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              background: "rgb(var(--bg-primary))",
              border: `2px solid ${submitted && !password ? "rgb(var(--accent-danger))" : "transparent"}`,
              borderRadius: "1rem",
              boxShadow:
                "inset 0 2px 4px rgb(0 0 0 / 0.02), 0 0 0 1px rgb(var(--border-primary))",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0 2px rgb(var(--accent-primary) / 0.2), 0 0 0 1px rgb(var(--accent-primary))";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 0 2px 4px rgb(0 0 0 / 0.02), 0 0 0 1px rgb(var(--border-primary))";
            }}
          >
            <div
              style={{
                width: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "rgb(var(--text-tertiary))",
              }}
            >
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                padding: "0.875rem 0 0.875rem 0",
                fontSize: "0.9375rem",
                color: "rgb(var(--text-primary))",
                fontFamily: "var(--font-sans)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "rgb(var(--text-tertiary))",
                flexShrink: 0,
              }}
            >
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {showPassword ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                ) : (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Remember / Forgot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "-0.25rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                accentColor: "rgb(var(--accent-primary))",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            />
            <span
              style={{
                fontSize: "0.875rem",
                color: "rgb(var(--text-secondary))",
                fontWeight: 500,
              }}
            >
              {t("auth.rememberMe") || "Remember me"}
            </span>
          </label>
          <Link
            to="/auth/forgot-password"
            style={{
              fontSize: "0.875rem",
              color: "rgb(var(--text-link))",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {t("auth.forgotPassword") || "Forgot password?"}
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "0.875rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 700,
            marginTop: "0.5rem",
            borderRadius: "1rem",
          }}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin"
                style={{ width: "20px", height: "20px" }}
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  style={{ opacity: 0.25 }}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={4}
                />
                <path
                  style={{ opacity: 0.75 }}
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t("auth.signInLoading") || "Signing in..."}
            </>
          ) : (
            <>
              {t("auth.signIn") || "Sign In"}
              <svg
                className="icon-dir"
                style={{ width: "18px", height: "18px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "2rem 0",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgb(var(--border-primary))",
          }}
        />
        <span
          style={{
            fontSize: "0.8125rem",
            color: "rgb(var(--text-tertiary))",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {t("auth.or") || "or continue with"}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgb(var(--border-primary))",
          }}
        />
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.9375rem",
          color: "rgb(var(--text-secondary))",
          margin: 0,
        }}
      >
        {t("auth.noAccount") || "Don't have an account?"}{" "}
        <Link
          to="/auth/register"
          style={{
            color: "rgb(var(--text-link))",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          {t("auth.signUp") || "Sign up"}
        </Link>
      </p>
    </div>
  );
}
