import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const Bae = () => {
  const [leaves, setLeaves] = useState([]);
  const [leavess, setLeavess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [rechercher, setRechercher] = useState('');
  const [recherche, setRecherche] = useState('');
  const [rechltabl, setRechltabl] = useState('');
  const [rechot, setRechot] = useState('');
  const [rechclient, setRechclient] = useState('');

  const navigate = useNavigate();
 


  const { user } = useAuth();
   
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

   useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/leaves/mya");
        setLeavess(data.leaves);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch leave history");
        toast.error(err.response?.data?.message || "Unable to fetch leave history");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/leaves/my");
        setLeaves(data.leaves);
 
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch leave history");
        toast.error(err.response?.data?.message || "Unable to fetch leave history");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);




  //Ouverture
  const dossierfiltre = leaves.filter(leaves =>
        leaves.nbDossier.toLowerCase().includes(recherche.toLowerCase())
       );



   const filtreltabl = leaves.filter(leaves =>
        leaves.nbltabl.toLowerCase().includes(rechltabl.toLowerCase())
       );

    
    const filtreot = leaves.filter(leaves =>
      leaves.nbOt.toLowerCase().includes(rechot.toLowerCase())
      );

    const filtreclient = leaves.filter(leaves =>
      leaves.client.toLowerCase().includes(rechclient.toLowerCase())
      );



     //Autre
  const dossierfiltred = leavess.filter(leaves =>
        leaves.nbDossier.toLowerCase().includes(recherche.toLowerCase())
       );



   const filtreltabld = leavess.filter(leaves =>
        leaves.nbltabl.toLowerCase().includes(rechltabl.toLowerCase())
       );

    
    const filtreotd = leavess.filter(leaves =>
      leaves.nbOt.toLowerCase().includes(rechot.toLowerCase())
      );

    const filtreclientd = leavess.filter(leaves =>
      leaves.client.toLowerCase().includes(rechclient.toLowerCase())
      );


      const assurancefiltre = leavess.filter(leaves =>
        leaves.statutfac === "BC"
       );

  return (

    <>
    
    {user.poste === "Secretaire" ? 
    <SidebarLayout title="Liste de Dossiers" items={navItems}> 

    <section className="glass-card p-4 sm:p-5">

       


      <div className="grid gap-4 mb-3 md:grid-cols-2">

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rechercher</label>
        <select
          className="field"
          value={rechercher}
          onChange={(e) => setRechercher(e.target.value)}
          required
        >
          <option value=""> </option>
          <option value="dossier">Par dossier</option>
          <option value="ltabl">Par LTA, BL </option>
          <option value="ot">Par OT</option>
          <option value="clients">Par Client</option>
        </select>
        </div>
      { rechercher === "dossier" ?

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par n° Dossier</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par n° Dossier" 
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
      </div> 
      
      :  rechercher === "ltabl" ?
       
       <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par LTA, BL</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par LTA, BL" 
        value={rechltabl}
        onChange={(e) => setRechltabl(e.target.value)}
      />

      </div>

      : rechercher === "ot" ?

      <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par OT</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par n° OT" 
        value={rechot}
        onChange={(e) => setRechot(e.target.value)}
      />

      </div>  
      
      : rechercher === "clients" ?
       

       <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par Client</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par n° Client" 
        value={rechclient}
        onChange={(e) => setRechclient(e.target.value)}
      />

      </div> 
      :

      null
  

      }
      


      </div>


        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : leaves.length === 0 ? (
          <p className="text-slate-500">Pas de dossiers ouverts.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>N° Dossier</th>
                  <th>Types</th>
                  <th>Cient</th>
                  <th>N° OT</th>
                  <th>N° LTA / BL</th>
                  <th>Description</th>
                  
                  <th> </th>
                </tr>
              </thead>
              <tbody>


                {rechercheass  ?

                

                  dossierfiltre.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                ))


               

                : rechltabl ?

                filtreltabl.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                   
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                ))

                : rechot?

                filtreot.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                ))

                : rechclient ?

                filtreclient.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">{leave.nbColis} colis de {leave.poids} Kg</td>
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                )) 

                :

                leaves.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                )) 



                }

            

              </tbody>
            </table>
          </div>
        )}
      </section>
    
    </SidebarLayout>











    : user.poste === "Facturier" ?
    
    <SidebarLayout title="Liste de Dossiers" items={navItemsfac}>


      <section className="glass-card p-6 sm:p-2">


         <div className="grid gap-4 mb-3 md:grid-cols-2">

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rechercher</label>
        <select
          className="field"
          value={rechercher}
          onChange={(e) => setRechercher(e.target.value)}
          required
        >
          <option value=""> </option>
          <option value="dossier">Par dossier</option>
          <option value="ltabl">Par LTA, BL </option>
          <option value="ot">Par OT</option>
          <option value="clients">Par Client</option>
        </select>
        </div>
      { rechercher === "dossier" ?

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par n° Dossier</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par n° Dossier" 
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
      </div> 
      
      :  rechercher === "ltabl" ?
       
       <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par LTA, BL</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par LTA, BL" 
        value={rechltabl}
        onChange={(e) => setRechltabl(e.target.value)}
      />

      </div>

      : rechercher === "ot" ?

      <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par OT</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par n° OT" 
        value={rechot}
        onChange={(e) => setRechot(e.target.value)}
      />

      </div>  
      
      : rechercher === "clients" ?
       

       <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par Client</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par n° Client" 
        value={rechclient}
        onChange={(e) => setRechclient(e.target.value)}
      />

      </div> 
      :

      null
  

      }
      


      </div>




        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : leavess.length === 0 ? (
          <p className="text-slate-500">Pas de dossiers ouverts.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>N° Dossier</th>
                  <th>Types</th>
                  <th>Cient</th>
                  <th>N° OT</th>
                  <th>N° LTA / BL</th>
                  <th>Description</th>
                  <th>STATUT</th>
                   <th></th>
                  
                </tr>
              </thead>
              <tbody>


                {recherche  ?

                

                  dossierfiltred.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                   <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                   <td className="capitalize ">
                      {leave.statutfac === "FACTURE" ?
                      <>
                      {leave.statutfac}

                      </> : leave.statutfac === "BC" || leave.statutfac === "BPA et BC"?


                        <>
                      En attente de  {leave.statutfac}

                      </> 

                      :

                      null

                      }
                      
                      
                    </td>
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                ))


               

                : rechltabl ?

                filtreltabld.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                    <td className="capitalize ">
                      {leave.statutfac === "FACTURE" ?
                      <>
                      {leave.statutfac}

                      </> : leave.statutfac === "BC" || leave.statutfac === "BPA et BC"?


                        <>
                      En attente de  {leave.statutfac}

                      </> 

                      :

                      null

                      }
                      
                      
                    </td>
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                ))

                : rechot?

                filtreotd.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                  <td className="capitalize ">
                      {leave.statutfac === "FACTURE" ?
                      <>
                      {leave.statutfac}

                      </> : leave.statutfac === "BC" || leave.statutfac === "BPA et BC"?


                        <>
                      En attente de  {leave.statutfac}

                      </> 

                      :

                      null

                      }
                      
                      
                    </td>
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                ))

                : rechclient ?

                filtreclientd.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                  <td className="capitalize ">
                      {leave.statutfac === "FACTURE" ?
                      <>
                      {leave.statutfac}

                      </> : leave.statutfac === "BC" || leave.statutfac === "BPA et BC"?


                        <>
                      En attente de  {leave.statutfac}

                      </> 

                      :

                      null

                      }
                      
                      
                    </td>
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                )) 

                :

                leavess.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                    <td className="capitalize ">
                      {leave.statutfac === "FACTURE" ?
                      <>
                      {leave.statutfac}

                      </> : leave.statutfac === "BC" || leave.statutfac === "BPA et BC"?


                        <>
                      En attente de  {leave.statutfac}

                      </> 

                      :

                      null

                      }
                      
                      
                    </td>
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>
                )) 



                }



              </tbody>
            </table>
          </div>
        )}
      </section>



    </SidebarLayout> 






    
    : user.poste === "Declarant" ?


    

       <SidebarLayout title="Bon à Enlevé" items={navItemsd}>


      <section className="glass-card p-9 sm:p-6">


         <div className="grid gap-4 mb-5 md:grid-cols-2">

        <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rechercher</label>
        <select
          className="field"
          value={rechercher}
          onChange={(e) => setRechercher(e.target.value)}
          required
        >
          <option value=""> </option>
          <option value="exo">Dossiers ayant reçu de Bon à Enlevé</option>
          <option value="nonexo"> Dossiers n'ayant pas reçu de Bon à Enlevé </option>
        </select>
        </div>
     


      </div>


       { rechercher === "exo" ?

      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Dossiers ayant reçu de Bon à Enlevé</h1>
      </div> 
      
      :  rechercher === "nonexo" ?
       
       <div className="mb-5">
         <h1 className="text-2xl font-bold tracking-tight text-slate-800">Dossiers n'ayant pas reçu de Bon à Enlevé</h1>
      </div>

      :

      null
  

      }
      




        {error && <p className="rounded-xl bg-rose-50 p-9 text-sm text-rose-600">{error}</p>}
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : leavess.length === 0 ? (
          <p className="text-slate-500">Pas de dossiers ouverts.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>N° Dossier</th>
                  <th>N° LTA / BL</th>
                  <th>N° Lettre d'Exo</th>
                  <th>N° Declaration</th>
                  <th>BAE reçu le: </th>
                  
                  
                   <th></th>
                  
                </tr>
              </thead>
              <tbody>


                { rechercher === "exo"  ?

                

                  leavess.map((leave)=> (
                   <>
                  { leave.leaveType !== "Prestation"  &  leave.datebae !== "" ? 
                     

                     <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize"> {leave.nblettreexo }</td>
                    <td className="capitalize">{leave.nbdecla }</td>
                    <td className="capitalize">{leave.datebae }</td>
                    
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>

                  :

                  null




                  }
                  

                  </>
                ))


               

                : rechercher === "nonexo" ?

                leavess.map((leave)=> (
                   <>
                  { leave.leaveType !== "Prestation"  &  !leave.datebae ? 
                     

                     <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize"> {leave.nblettreexo }</td>
                    <td className="capitalize">{leave.nbdecla }</td>
                    <td className="capitalize">{leave.datebae }</td>
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>

                  :

                  null




                  }
                  

                  </>
                ))

                

                :

                leavess.map((leave)=> (

                  <>
                  { leave.leaveType !== "Prestation" ? 
                     

                     <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize"> {leave.nblettreexo }</td>
                    <td className="capitalize">{leave.nbdecla }</td>
                    <td className="capitalize">{leave.datebae }</td>
                    
                    <td>

                      <span className=" px-2 py-1 text-xs font-semibold capitalize">
                        <Link
                        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                         to={"/onleave/"+leave._id}
                        
                        type="button"
                        >
                           Actualiser 
                           
                        </Link>
                      </span>

                    </td>
                  </tr>

                  :

                  null




                  }
                  

                  </>
                )) 



                }



              </tbody>
            </table>
          </div>
        )}
      </section>



    </SidebarLayout> 


: null

      }
      
   
    </>
  );
};

export default Bae;
