import { useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ApplyLeavePage = () => {
  const [form, setForm] = useState({
    leaveType: "",
     
    nbDoss: "",

    cetegorie: "",
    nbDossier: "",
    client: "",
    assurance: "",
    pakliste: "",
    fournisseur: "",
    nbOt: "",
    typeTc: "",
    nbTc: "",
    nbltabl: "",
    nbColis: "",
    poids: "",
    desigation: "",
    factcom: "",
    bondesortie: "",
    exportinvoice: "",

    fromDate: "",
    toDate: "",
    reason: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [leavess, setLeavess] = useState([]);
  const [leaves, setLeaves] = useState([]);

  

  const navItems = [
    { to: "/employee", label: "Dashboard" },
    { to: "/employee/apply", label: "Ouverture Dossiers" },
    { to: "/employee/history", label: "Liste de Dossiers" },
    { to: "/employee/analytics", label: "Rapport" },
    { to: "/employee/tickets", label: "Message" }
  ];

  



const Tm = () => {
  
 if(form.leaveType === "Maritime" & form.cetegorie === "Import"){
    return(
     "IFlIM"
    )
 } else if(form.leaveType === "Maritime" & form.cetegorie === "Export"){
    return("EM")
 } else if(form.leaveType === "Aerien" & form.cetegorie === "Import"){
    return("IA")
 } else if(form.leaveType === "Aerien" & form.cetegorie === "Export"){
    return("EA")
 } else if(form.leaveType === "Terrestre" & form.cetegorie === "Import"){
    return("IT")
 } else if(form.leaveType === "Terrestre" & form.cetegorie === "Export"){
    return("ET")
 } else if(form.leaveType === "Prestation"){
    return("P")
 };
};

console.log(Tm())


  

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
     await client.post("/leaves", form);
      setMessage("Enregistré");
      toast.success("Enregistré");
      setForm({ 
        leaveType: "",
         
         nbDoss: "",

         cetegorie: "",
         nbDossier: "",
         client: "",
         assurance: "",
         pakliste: "",
         fournisseur: "",
         nbOt: "",
         typeTc: "",
         nbTc: "",
         nbltabl: "",
         nbColis: "",
         poids: "",
         desigation: "",
         factcom: "",
         bondesortie: "",
         exportinvoice: "",
         fromDate: "", 
         toDate: "", 
         reason: "" });
       navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || "Errer d'enregistrement, verifié votre numero de Dossier");
      toast.error(err.response?.data?.message || "Errer d'enregistrement, verifié votre numero de Dossier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout title="Ouverture Dossier" items={navItems}>
       


      <form onSubmit={onSubmit} className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-6">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      
      
       <div className="grid gap-4 md:grid-cols-2">

        

         <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date d'Ouverture</label>
            <input
              className="field"
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={onChange}
              required
            />
          </div>

         <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Numero Dossier</label>
        <input
          className="field"
          name="nbDossier"
          value={form.nbDossier}
          onChange={onChange}
          required

        />
          
        </div>

        

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Type Dossier</label>
        <select
          className="field"
          name="leaveType"
          value={form.leaveType}
          onChange={onChange}
          required
        >
          <option value=""> </option>
          <option value="Maritime">Maritime</option>
          <option value="Aerien">Aérien</option>
          <option value="Terrestre">Terrestre</option>
          <option value="Prestation">Prestation</option>
        </select>
        </div>

      {form.leaveType === "Prestation" ? null : 
      
      <div> 
        
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Gategorie</label>
        <select
          className="field"
          name="cetegorie"
          value={form.cetegorie}
          onChange={onChange}
          required
        >
          <option value=""> </option>
          <option value="Import">Import</option>
          <option value="Export">Export</option>
        </select>
        </div>

      </div>

      }
        

       

       

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Client</label>
        <select
          className="field"
          name="client"
          value={form.client}
          onChange={onChange}
          required
        >
          <option value=""> </option>
          <option value="CNR">CNR</option>
          <option value="PETROFAC">PETROFAC</option>
          <option value="PETROCI">PETROCI</option>
          <option value="NOPCI">NOPCI</option>
          <option value="PROMAR SHIPPING">PROMAR SHIPPING</option>
          <option value="ATT">ATT</option>
        </select>
        </div>

        {form.leaveType === "Prestation" ? null : 

        <>
           

          {form.leaveType === "Maritime" ? 
       <>
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Type TC</label>
        <select
          className="field"
          name="typeTc"
          value={form.typeTc}
          onChange={onChange}
        >
          <option value=" "> </option>
          <option value="10'">10'</option>
          <option value="20'">20'</option>
          <option value="30'">30'</option>
          <option value="40'">40'</option>
        </select>
        </div>

          <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Nombre TC</label>
        <input
          type="number"
          min={1}
          className="field"
          name="nbTc"
          value={form.nbTc}
          onChange={onChange}
          
          
        />
          
        </div>

      </>
           : null
          }


        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Fournisseur</label>
        <input
          className="field"
          name="fournisseur"
          value={form.fournisseur}
          onChange={onChange}
          required

        />
          
        </div>

       {form.client === "CNR" ?  
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">OT n°:</label>
        <input
          className="field"
          name="nbOt"
          value={form.nbOt}
          onChange={onChange}
          
        />
          
        </div> : null
        }

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">LTA / BL n°:</label>
        <input
          className="field"
          name="nbltabl"
          value={form.nbltabl}
          onChange={onChange}
          
        />
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Nombre Colis</label>
        <input
          type="number"
          min={1}
          className="field"
          name="nbColis"
          value={form.nbColis}
          onChange={onChange}
          required
          
        />
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Poids (Kg) </label>
        <input
          type="number"
          min={1}
          className="field"
          name="poids"
          value={form.poids}
          onChange={onChange}
          required
          
        />
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Facture Commerciale n°:</label>
        <input
          className="field"
          name="factcom"
          value={form.factcom}
          onChange={onChange}
          
        />
          
        </div>

        {form.cetegorie === "Import" ? null : 
        <>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Bon de Sortie</label>
        <input
          className="field"
          name="bondesortie"
          value={form.bondesortie}
          onChange={onChange}
          
        />
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Ivoice Export</label>
        <input
          className="field"
          name="exportinvoice"
          value={form.exportinvoice}
          onChange={onChange}
          
        />
          
        </div>

        </>}

      
         
         

          </>

          }

          </div>

     {form.leaveType === "Prestation" ? null : 

        
<>
        <label className="block text-sm font-semibold text-slate-700">Designation</label>
        <textarea
          className="field"
          rows="2"
          name="desigation"
          value={form.desigation}
          onChange={onChange}
          required
          
        />
  </>

         }



        <label className="block text-sm font-semibold text-slate-700">Observation</label>
        <textarea
          className="field"
          rows="2"
          name="reason"
          value={form.reason}
          onChange={onChange}
          
        />
        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Submitting..." : "Enregistrer"}
        </button>
      </form>
    </SidebarLayout>
  );
};

export default ApplyLeavePage;
