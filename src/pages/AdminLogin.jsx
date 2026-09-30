import { useState } from "react";
import { supabase } from "../lib/supabase";

import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro no login:", error);

      setError(
        "Email ou palavra-passe incorretos."
      );

      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          <img
            src="/logo-lagostim.png"
            alt="Lagostim de MZ"
          />
        </div>

        <div className="admin-login-header">
          <span>
            LAGOSTIM DE MZ
          </span>

          <h1>
            Área Administrativa
          </h1>

          <p>
            Entre para gerir o menu.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="admin-login-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Digite o seu email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>

          <div className="admin-login-field">

            <label htmlFor="password">
              Palavra-passe
            </label>

            <input
              id="password"
              type="password"
              placeholder="Digite a sua palavra-passe"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "A entrar..."
              : "Entrar"}
          </button>

        </form>

        <a
          href="/"
          className="admin-login-back"
        >
          ← Voltar ao site
        </a>

      </div>

    </div>
  );
}

export default AdminLogin;