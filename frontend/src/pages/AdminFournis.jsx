



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import getApiErrorMessage from "../utils/getApiErrorMessage";
import { Link } from "react-router-dom";

const emptyClient = { nccFournis: "", nomFournis: "", mailFournis: "", localFournis: "", nubFournis: "", diminFournis: ""};

const AdminFournis = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(emptyClient);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

 const navItemsa = [
    { to: "/admin/analytics", label: "Suivi des Dossiers" },
    { to: "/history", label: "Liste de Dossiers" },
    { to: "/admin/user", label: "Gestion Utilisateurs" },
    { to: "/admin/client", label : "Gestion des Clients" },
    { to: "/admin/fournisseurs", label : "Gestion des Fournisseurs" },
    { to: "/assurance", label: "Assurances" },
    { to: "/exo", label: "Lettres d'Exo" },
    { to: "/declaration", label: "Declaration" },
    { to: "/regul", label: "Regularisation" },
    { to: "/bae", label: "Bons a enlever" },
    { to: "/bpafac", label: "En attente de BPA" },
    { to: "/bcfac", label: "En attente de BC" },
    { to: "/factures", label: "Factures" },
    { to: "/releves", label: "Relevés" },
    { to: "/admin/tickets", label: "Messages" }
  ];

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await client.get("/fournisseur");
      setClients(data.clients);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to fetch Client"));
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
      await client.post("/fournisseur/creer", form);
      setForm(emptyClient);
      setMessage("Fournisseur created");
      toast.success("Fournisseur created");
      await loadUsers();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Ce Client est peut être déjà enregistré ");
      setError(msg);
      toast.error(msg);
    }
  };

  const deleteUser = async (id) => {
    setError("");
    try {
      await client.delete(`/fournisseur/${id}`);
      toast.success("Client deleted");
      await loadUsers();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to delete Client");
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <SidebarLayout title="Admin Panel" items={navItemsa}>
      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Generer un Fournisseur</h2>
        {error && <p className="mb-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && (
          <p className="mb-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>
        )}
        <form onSubmit={createUser} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            className="field"
            placeholder="N°CC"
            value={form.nccFournis}
            onChange={(e) => setForm((p) => ({ ...p, nccFournis: e.target.value }))}
            required
          />
          <input
            className="field"
            placeholder="Nom de Fournisseur"
            value={form.nomFournis}
            onChange={(e) => setForm((p) => ({ ...p, nomFournis: e.target.value }))}
            required
          />
          
          <input
            className="field"
            type="email"
            placeholder="Email du Fournisseur"
            value={form.mailFournis}
            onChange={(e) => setForm((p) => ({ ...p, mailFournis: e.target.value }))}
            required
          />

          <input
            className="field"
            placeholder="Situation géographique"
            value={form.localFournis}
            onChange={(e) => setForm((p) => ({ ...p, localFournis: e.target.value }))}
            required
          />


          <input
            className="field"
            placeholder="Téléphone Fournisseur"
            value={form.nubFournis}
            onChange={(e) => setForm((p) => ({ ...p, nubFournis: e.target.value }))}
            required
          />


          <input
            className="field"
            min={3}
            max={4}
            placeholder="Abregé du Nom (en Majuscule)"
            value={form.diminFournis}
            onChange={(e) => setForm((p) => ({ ...p, diminFournis: e.target.value }))}
          />


           
         {/**  <div className="flex gap-2">
            <select
              className="field"
              required
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            >
              <option value=""></option>
              <option value="employee">Employé</option>
              <option value="admin">Administrateur</option>
            
              
            </select> 

            </div>*/}

           <div className="flex gap-2">
           
            <button className="btn-primary" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </section>

      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Fournisseurs</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>N° CC</th>
                  <th>Nom</th>
                  <th>Diminitif</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>{client.nccFournis}</td>
                    <td>{client.nomFournis}</td>
                    
                    <td>
                      
                       {client.diminFournis}
                     
                    </td>

                    <td>
                      <Link
                        type="button"
                        className="btn-primary text-xs"
                        to={"/admin/fournisUpt/"+client._id}
                      >
                       Modifier
                      </Link>
                    </td>


                    <td>
                      <button
                        type="button"
                        className="btn-danger text-xs"
                        onClick={() => deleteUser(client._id)}
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

export default AdminFournis;

