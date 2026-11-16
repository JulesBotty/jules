



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import getApiErrorMessage from "../utils/getApiErrorMessage";
import { useNavigate, useParams } from "react-router-dom";

const emptyClient = { nccClient: "", nomClient: "", mailClient: "", localClient: "", nubClient: "", diminClient: ""};
//const onChange = (e) => setClients((prev) => ({ ...prev, [e.target.name]: e.target.value }));
const AdminClientUpt = () => {
  const [clients, setClients] = useState([]);
  //const [form, setForm] = useState(emptyClient);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {id} = useParams()

  const navigate = useNavigate();

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

  


  useEffect(() => {
    const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await client.get('/clients/onclient/'+id);
      setClients(data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to fetch users"));
    } finally {
      setLoading(false);
    }
   //loadUsers()
  };
    loadUsers();
  }, [id]);


  const createUser = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await client.put(
        `/clients/updateclient/${id}`,
        clients,  
      );
      setMessage("Enregistré");
      toast.success("Enregistré");

      setClients(); 

      navigate('/admin/client');

     
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed");
      setError(msg);
      toast.error(msg);
    }
  };

  

  return (
    <SidebarLayout title="Admin Panel" items={navItemsa}>
      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Actualisation</h2>
        {error && <p className="mb-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && (
          <p className="mb-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>
        )}
        <form onSubmit={createUser} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            className="field"
            placeholder="N°CC"
            name="nccClient"
            value={clients.nccClient}
            onChange={(e) => setClients((p) => ({ ...p, nccClient: e.target.value }))}
            required
          />
          <input
            className="field"
            placeholder="Nom de Client"
            name="nomClient"
            value={clients.nomClient}
            onChange={(e) => setClients((p) => ({ ...p, nomClient: e.target.value }))}
            required
          />

          
          <input
            className="field"
            type="email"
            placeholder="Email du Client"
            name="mailClient"
            value={clients.mailClient}
            onChange={(e) => setClients((p) => ({ ...p, mailClient: e.target.value }))}
            required
          />

          <input
            className="field"
            placeholder="Situation géographique"
            name="localClient"
            value={clients.localClient}
            onChange={(e) => setClients((p) => ({ ...p, localClient: e.target.value }))}
            required
          />


          <input
            className="field"
            placeholder="Téléphone Client"
            name="nubClient"
            value={clients.nubClient}
            onChange={(e) => setClients((p) => ({ ...p, nubClient: e.target.value }))}
            required
          />


          <input
            className="field"
            min={3}
            max={4}
            placeholder="Abregé du Nom (en Majuscule)"
            name="diminClient"
            value={clients.diminClient}
            onChange={(e) => setClients((p) => ({ ...p, diminClient: e.target.value }))}
            required
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
              Modifier
            </button>
          </div>
        </form>
      </section>

      
    </SidebarLayout>
  );
};

export default AdminClientUpt;

