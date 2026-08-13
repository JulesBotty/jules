



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import getApiErrorMessage from "../utils/getApiErrorMessage";

const emptyUser = { name: "", email: "", password: "123456", role: "employee", poste: ""};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navItems = [
    { to: "/admin/analytics", label: "Suivi des Dossiers" },
    { to: "/admin/user", label: "Gestion Utilisateurs" },
    { to: "/admin/tickets", label: "Messages" }
  ];

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await client.get("/users");
      setUsers(data.users);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to fetch users"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await client.post("/users", form);
      setForm(emptyUser);
      setMessage("User created");
      toast.success("User created");
      await loadUsers();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to create user");
      setError(msg);
      toast.error(msg);
    }
  };

  const deleteUser = async (id) => {
    setError("");
    try {
      await client.delete(`/users/${id}`);
      toast.success("User deleted");
      await loadUsers();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to delete user");
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <SidebarLayout title="Admin Panel" items={navItems}>
      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Créer un Utilisateur</h2>
        {error && <p className="mb-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && (
          <p className="mb-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>
        )}
        <form onSubmit={createUser} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            className="field"
            placeholder="Nom et Prénoms"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
          />
          <input
            className="field"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          
          <input
            className="field"
            type="hidden"
            placeholder="Code"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
          />
           
          <div className="flex gap-2">
            <select
              className="field"
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            >
              <option value="employee">Employé</option>
              <option value="manager">Manager</option>
              <option value="admin">Administrateur</option>
            </select>

            </div>

           <div className="flex gap-2">
            <select
              className="field"
              value={form.poste}
              onChange={(e) => setForm((p) => ({ ...p, poste: e.target.value }))}
            >
              <option value="PDG">PDG</option>
              <option value="DG">DG</option>
              <option value="RH">RH</option>
              <option value="Secretaire">Secretaire</option>
              <option value="Declarant">Declarant</option>
              <option value="Logisticien">Logisticien</option>
              <option value="Facturier">Facturier</option>
              <option value="Comptable">Comptable</option>
              <option value="Transitaire">Transitaire</option>
              <option value="Chauffeur">Chauffeur</option>
            </select>
            <button className="btn-primary" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </section>

      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Utilisateurs</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nom et Prénoms</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Poste</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize">
                        {user.poste}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-danger text-xs"
                        onClick={() => deleteUser(user._id)}
                      >
                       Surprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </SidebarLayout>
  );
};

export default AdminDashboard;

