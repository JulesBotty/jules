import React, { useEffect, useState, } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import LeaveHistoryPage from "./LeaveHistoryPage";
import { Route } from "react-router-dom";
import { Axios } from "axios";


const Onely = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const {id} = useParams()
  const [elements, setElements] = useState([]);
  const [editId, setEditId] = useState();
  const [valeurModifiee, setValeurModifiee] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await client.get('/leaves/onleave/'+id);
        setLeaves(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch leave history");
        toast.error(err.response?.data?.message || "Unable to fetch leave history");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);


   const onChange = (e) => setLeaves((prev) => ({ ...prev, [e.target.name]: e.target.value }));

   

   const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    leaves.status = "Aprouvé";

    try {
      await client.put(
        `/leaves/updateleave/${id}`,
        leaves,  
      );
      setMessage("Enregistré");
      toast.success("Enregistré");

      setLeaves();
      
       navigate('/employee/history');
     
    } catch (err) {
      setError(err.response?.data?.message || "Errer d'enregistrement");
      toast.error(err.response?.data?.message || "Errer d'enregistrement");
    } finally {
      setLoading(false);
    }
  };



  const onSubmitr = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    leaves.status = "Rejeté"

    try {
      await client.put(
        `/leaves/updateleave/${id}`,
        leaves,  
      );
      setMessage("Enregistré");
      toast.success("Enregistré");

      setLeaves();
      
       navigate('/employee/history');
     
    } catch (err) {
      setError(err.response?.data?.message || "Errer d'enregistrement");
      toast.error(err.response?.data?.message || "Errer d'enregistrement");
    } finally {
      setLoading(false);
    }
  };

 
  const navItems = [
    { to: "/employee", label: "Dashboard" },
    { to: "/employee/apply", label: "Ouverture Dossiers" },
    { to: "/employee/history", label: "Liste de Dossiers" },
    { to: "/employee/analytics", label: "Rapport" },
    { to: "/employee/tickets", label: "Message" }
  ];

  const navItemsfac = [
    { to: "/employee/history", label: "Liste de Dossiers" },
    { to: "/bpafac", label: "En attente de BPA" },
    { to: "/bcfac", label: "En attente de BC" },
    { to: "/factures", label: "Factures" },
    { to: "/releves", label: "Relevés" },
    { to: "/employee/tickets", label: "Message" }
  ];

  const navItemsd = [
    { to: "/employee/history", label: "Liste de Dossiers" },
    { to: "/assurance", label: "Assurances" },
    { to: "/exo", label: "Exo" },
    { to: "/declaration", label: "Declaration" },
    { to: "/regul", label: "Regularisation" },
    { to: "/bae", label: "BAE" },
    { to: "/employee/tickets", label: "Message" }
  ];

  const navItemsl = [
    { to: "/employee", label: "Dashboard" },
    { to: "/employee/apply", label: "Ouverture Dossiers" },
    { to: "/employee/history", label: "Liste de Dossiers" },
    { to: "/employee/analytics", label: "Rapport" },
     { to: "/bpafac", label: "En attente de BPA" },
    { to: "/bcfac", label: "En attente de BC" },
    { to: "/factures", label: "Factures" },
    { to: "/releves", label: "Relevés" },
    { to: "/assurance", label: "Assurances" },
    { to: "/exo", label: "Exo" },
    { to: "/declaration", label: "Declaration" },
    { to: "/regul", label: "Regularisation" },
    { to: "/bae", label: "BAE" },
    { to: "/employee/tickets", label: "Message" },
  ];




 


 


 
  

  return (

    <>
    

   

    {user.poste === "Secretaire"? 
    <SidebarLayout title="Détail" items={navItems}> 

  

       <div className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-8">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      
      <div className="text-center mb-10">
          
          Dossier: {leaves.nbDossier}

      </div>
      <h1>
       <div className="grid gap-4 md:grid-cols-1 ">

       


        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Type Dossier: {leaves.cetegorie} {leaves.leaveType}</label>
        
         
        </div>

        

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Client: {leaves.client}</label>
        
        </div>

        {leaves.leaveType === "Prestation" ? null : 

        <>
           

          {leaves.leaveType === "Maritime" ? 
       <>
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Type TC : {leaves.typeTc}</label>
        
        </div>

          <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Nombre TC: {leaves.nbTc}</label>
        
          
        </div>

      </>
           : null
          }


        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Fournisseur: {leaves.fournisseur}</label>
        
          
        </div>

       {leaves.client === "CNR" ?  
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">OT n°: {leaves.nbOt}</label>
        
          
        </div> : null
        }

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">LTA / BL n°: {leaves.nbltabl}</label>
        
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Nombre Colis: {leaves.nbColis}</label>
      
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Poids (Kg): {leaves.poids}</label>
        
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Facture Commerciale n°: {leaves.factcom}</label>
        
          
        </div>

        {leaves.cetegorie === "Import" ? 
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">ETA: {leaves.eta}</label>
        
          
        </div> : 
        <>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Bon de Sortie: {leaves.bondesortie}</label>
        
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Ivoice Export: {leaves.exportinvoice}</label>
        
          
        </div>

        </>}

      
         
         

          </>

          }
        
          </div>

     {leaves.leaveType === "Prestation" ? null : 

        
<>
        <label className="block text-sm font-semibold text-slate-700">Designation: {leaves.desigation}</label>
        
  </>

         }



        <label className="block text-sm font-semibold text-slate-700">Observation: {leaves.reason}</label>
       </h1>
       {
         user.poste === "Secretaire"?
<div>
         <Link
          className=" btn-primary w-full sm:w-auto "
          to={"/onleave/"+leaves._id}
                                
          type="button"
           >
          Actualiser 
                                   
         </Link>


  </div>

        : user.poste === "Logisticien" ?
     <div className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-2  grid gap-4 md:grid-cols-2">
      <div>
        <form onSubmit={onSubmit} >

         <input
          className="field"
          type="hidden"
          name="status"
          value={leaves.status}
          onChange={onChange}
          required

        />     

        <button  type="button"  disabled={loading} className="btn-accent ">
          {loading ? "Chargement..." : "Aprouver"}
        </button>


        </form>
      </div>
       
      <div>

        <form onSubmit={onSubmitr} >

         <input
          className="field"
          type="hidden"
          name="status"
          value={leaves.status}
          onChange={onChange}
          required

        />  

         <button  type="button" disabled={loading} className="btn-danger  ">
          {loading ? "Chargement..." : "Rejeter"}
        </button>
          

        </form>

      </div>

     </div>

        : 
        null


       }
        
      </div>
    
   
      
    
    </SidebarLayout>



:user.poste === "Logisticien"? 
    <SidebarLayout title="Détail" items={navItemsl}> 

  

       <div className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-8">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      
      <div className="text-center mb-10">
          
          Dossier: {leaves.nbDossier}

      </div>
      <h1>
       <div className="grid gap-4 md:grid-cols-1 ">

       


        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Type Dossier: {leaves.cetegorie} {leaves.leaveType}</label>
        
         
        </div>

        

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Client: {leaves.client}</label>
        
        </div>

        {leaves.leaveType === "Prestation" ? null : 

        <>
           

          {leaves.leaveType === "Maritime" ? 
       <>
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Type TC : {leaves.typeTc}</label>
        
        </div>

          <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Nombre TC: {leaves.nbTc}</label>
        
          
        </div>

      </>
           : null
          }


        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Fournisseur: {leaves.fournisseur}</label>
        
          
        </div>

       {leaves.client === "CNR" ?  
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">OT n°: {leaves.nbOt}</label>
        
          
        </div> : null
        }

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">LTA / BL n°: {leaves.nbltabl}</label>
        
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Nombre Colis: {leaves.nbColis}</label>
      
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Poids (Kg): {leaves.poids}</label>
        
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Facture Commerciale n°: {leaves.factcom}</label>
        
          
        </div>

        {leaves.cetegorie === "Import" ? 
        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">ETA: {leaves.eta}</label>
        
          
        </div> : 
        <>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Bon de Sortie: {leaves.bondesortie}</label>
        
          
        </div>

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Ivoice Export: {leaves.exportinvoice}</label>
        
          
        </div>

        </>}

      
         
         

          </>

          }
        
          </div>

     {leaves.leaveType === "Prestation" ? null : 

        
<>
        <label className="block text-sm font-semibold text-slate-700">Designation: {leaves.desigation}</label>
        
  </>

         }



        <label className="block text-sm font-semibold text-slate-700">Observation: {leaves.reason}</label>
       </h1>
       {
         user.poste === "Secretaire"?
<div>
         <Link
          className=" btn-primary w-full sm:w-auto "
          to={"/onleave/"+leaves._id}
                                
          type="button"
           >
          Actualiser 
                                   
         </Link>


  </div>

        : user.poste === "Logisticien" ?
     <div className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-2  grid gap-4 md:grid-cols-2">
      <div>
        <form onSubmit={onSubmit} >

         <input
          className="field"
          type="hidden"
          name="status"
          value={leaves.status}
          onChange={onChange}
          required

        />     

        <button  type="button"  disabled={loading} className="btn-accent ">
          {loading ? "Chargement..." : "Aprouver"}
        </button>


        </form>
      </div>
       
      <div>

        <form onSubmit={onSubmitr} >

         <input
          className="field"
          type="hidden"
          name="status"
          value={leaves.status}
          onChange={onChange}
          required

        />  

         <button  type="button" disabled={loading} className="btn-danger  ">
          {loading ? "Chargement..." : "Rejeter"}
        </button>
          

        </form>

      </div>

     </div>

        : 
        null


       }
        
      </div>
    
   
      
    
    </SidebarLayout>


//////////////////////// Facturation


    : user.poste === "Facturier" ?
    
    <SidebarLayout title="Mise à Jour"  items={navItemsfac}>


       <form onSubmit={onSubmit} className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-6">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      
      <div className="text-center mb-10">
          
          Dossier: {leaves.nbDossier}

      </div>
      
       <div className="grid gap-4 md:grid-cols-2">


        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Statut</label>
        <select
          className="field"
          name="statutfac"
          value={leaves.statutfac}
          onChange={onChange}
          required
        >
          <option value=""> </option>
          <option value="BPA et BC">En attente de BPA et BC</option>
          <option value="BC">En attente de BC</option>
          <option value="FACTURE">Facturé</option>
        </select>
        </div>



      {leaves.statutfac === "BPA et BC" ? 

      <div>
      
       <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Motant de la Pro-forma</label>
        <input
          type="number"
          min={1}
          className="field"
          name="montantfac"
          value={leaves.montantfac}
          onChange={onChange}
          required
          
        />
          
        </div>

        <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date de dépos</label>
            <input
              className="field"
              type="date"
              name="datedepos"
              value={leaves.datedepos}
              onChange={onChange}
              required
            />
          </div>

          </div>



      
      : 
           leaves.statutfac === "BC" ?

      <div>
          <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Motant de la Pro-forma</label>
        <input
          type="number"
          min={1}
          className="field"
          name="montantfac"
          value={leaves.montantfac}
          onChange={onChange}
          required
          
        />
          
        </div>

        <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date de dépos</label>
            <input
              className="field"
              type="date"
              name="datedepos"
              value={leaves.datedepos}
              onChange={onChange}
              required
            />
          </div>


          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date de Signature</label>
            <input
              className="field"
              type="date"
              name="datesignprof"
              value={leaves.datesignprof}
              onChange={onChange}
              required
            />
          </div>


           </div>

           :leaves.statutfac === "FACTURE" ?

      <div>
          <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Motant de la Facture</label>
        <input
          type="number"
          min={1}
          className="field"
          name="montantfac"
          value={leaves.montantfac}
          onChange={onChange}
          required
          
        />
          
        </div>


        <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Motant de Debours Douanes</label>
        <input
          type="number"
          min={1}
          className="field"
          name="deb_douanes"
          value={leaves.deb_douanes}
          onChange={onChange}
          
          
        />
          
        </div>

        <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Motant de Debours Divers</label>
        <input
          type="number"
          min={1}
          className="field"
          name="deb_divers"
          value={leaves.deb_divers}
          onChange={onChange}
          
          
        />
          
        </div>


        <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Motant de Prestation</label>
        <input
          type="number"
          min={1}
          className="field"
          name="montantprest"
          value={leaves.montantprest}
          onChange={onChange}
          
          
        />
          
        </div>

        <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700"> Numero de Facture</label>
        <input
          type=""
          min={1}
          className="field"
          name="nbfact"
          value={leaves.nbfact}
          onChange={onChange}
          required
          
        />
          
        </div>

      

          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date de Facturation</label>
            <input
              className="field"
              type="date"
              name="datefacture"
              value={leaves.datefacture}
              onChange={onChange}
              required
            />
          </div>


           </div>

           :

           null

      }

      </div>
        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Chargement..." : "Mettre à jour"}
        </button>
      </form>



    </SidebarLayout> 

    
    :user.poste === "Declarant" ?








    ///////////////// Declaration

     <SidebarLayout title="Mise à Jour" items={navItemsd}>


       <form onSubmit={onSubmit} className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-6">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      
      <div className="text-center mb-10">
          
          Dossier: {leaves.nbDossier}

      </div>


      


       <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="mb-3 font-black " >
        <h1 className="text-2xl font-bold tracking-tight text-slate-800" ><u>Assurance</u></h1>
        </div>


           <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Assurance réçu le:</label>
            <input
              className="field"
              type="date"
              name="dateassur"
              value={leaves.dateassur}
              onChange={onChange}
            
            />
          </div>
  
        </div>


        <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="mb-3 font-black " >
        <h1 className="text-2xl font-bold tracking-tight text-slate-800"><u>Lettre d'EXO</u></h1>
        </div>

        <div>
         
         
          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">N° de lettre d'EXO</label>
            <input
              className="field"
              type="text"
              name="nblettreexo"
              value={leaves.nblettreexo}
              onChange={onChange}

            />
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">EXO reçu du DGD le:</label>
            <input
              className="field"
              type="date"
              name="dateexodgd"
              value={leaves.dateexodgd}
              onChange={onChange}
            
            />
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date d'envoi d'EXO au Client</label>
            <input
              className="field"
              type="date"
              name="dateexoclient"
              value={leaves.dateexoclient}
              onChange={onChange}
            
            />
          </div>


        </div>
  
          
        </div>




         <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="mb-3 font-black " >
        <h1 className="text-2xl font-bold tracking-tight text-slate-800"><u>Declaration</u></h1>
        </div>

        <div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date de Tirage Déclaration</label>
            <input
              className="field"
              type="date"
              name="datetiragedecla"
              value={leaves.datetiragedecla}
              onChange={onChange}
              
            />
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">N° de Déclaration</label>
            <input
              className="field"
              type="text"
              name="nbdecla"
              value={leaves.nbdecla}
              onChange={onChange}
              
            />
          </div>

        </div>

        </div>




        <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="mb-3 font-black " >
        <h1 className="text-2xl font-bold tracking-tight text-slate-800"><u>Regularisation</u></h1>
        </div>

        <div>

        
        <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Status de la Regularisation</label>
          
         <select
          className="field"
          name="statusregul"
          value={leaves.statusregul}
          onChange={onChange}
        >
          <option value=""> </option>
          <option value="Partiel">Partiel</option>
          <option value="Complet">Complet</option>
        </select>
         </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Date d'envoi de Regul. au Client</label>
            <input
              className="field"
              type="date"
              name="dateregulclient"
              value={leaves.dateregulclient}
              onChange={onChange}
              
            />
          </div>

          </div>


        </div>



       <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="mb-3 font-black " >
        <h1 className="text-2xl font-bold tracking-tight text-slate-800"><u>Bon à Enlevé</u></h1>
        </div>


           <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Bon à Enlevé (Date)</label>
            <input
              className="field"
              type="date"
              name="datebae"
              value={leaves.datebae}
              onChange={onChange}
            />
          </div>

        </div>

      

      
        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Chargement..." : "Mettre à jour"}
        </button>
      </form>



    </SidebarLayout> 



    :

    null

      }

    
      
   
    </>
  );
};

export default Onely;