import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import authBg from "../assets/auth-workflow-bg.svg";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "manager") {
        navigate("/manager");
      } else if(user.poste === "Declarant"){
        navigate("/employee/history");
      } else if(user.poste === "Facturier"){
        navigate("/employee/history");
      } else{
        navigate("/employee");
      }

      toast.success("Login successful");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg-page" style={{ backgroundImage: `url(${authBg})` }}>
      <div className="auth-overlay-card">
        <div className="auth-copy">
          <h2>InterFreight and Logistics</h2>
          
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-4">
              
              <p className="text-xl font-bold">Suivie des Dossiers</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4">
             
              <p className="text-xl font-bold">Gestion du Personnel</p>
            </div>
          </div>
        </div>

        <div className="auth-form-pane">
          <form onSubmit={onSubmit} className="auth-form-inner">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Connexion</h1>
            <p className="text-sm text-slate-600">Connectez vous.</p>
            {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
            <input
              className="field"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              className="field"
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={onChange}
              required
            />
            <button disabled={loading} className="btn-primary w-full" type="submit">
              {loading ? "Chargement..." : "Connexion"}
            </button>
            <p className="text-sm text-slate-600">
              Nouveau Utilisateur?{" "}
              <Link className="auth-link" to="/register">
                Creer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
