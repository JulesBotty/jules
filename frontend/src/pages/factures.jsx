import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const Factures = () => {
  const [leaves, setLeaves] = useState([]);
  const [leavess, setLeavess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [rechercher, setRechercher] = useState('');
  const [recherche, setRecherche] = useState('');
  const [rechltabl, setRechltabl] = useState('');
  const [rechot, setRechot] = useState('');
  const [rechclient, setRechclient] = useState('');
  const [rechnbfc, setRechnbfc] = useState('');
  const [rechdate, setRechdate] = useState('');

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

 const Tm = () => {
  
 if(leaves.leaveType === "Maritime" & form.cetegorie === "Import"){
    return("IM")
 } else if(leaves.leaveType === "Maritime" & form.cetegorie === "Export"){
    return("EM")
 } else if(leaves.leaveType === "Aerien" & form.cetegorie === "Import"){
    return("IA")
 } else if(leaves.leaveType === "Aerien" & form.cetegorie === "Export"){
    return("EA")
 } else if(leaves.leaveType === "Terrestre" & form.cetegorie === "Import"){
    return("IT")
 } else if(leaves.leaveType === "Terrestre" & form.cetegorie === "Export"){
    return("ET")
 } else if(leaves.leaveType === "Prestation"){
    return("P")
 };
};



  //Ouverture
  const dossierfiltre = leavess.filter(leaves =>
        leaves.statutfac === "BC"
       );


 const dossierfiltred = leavess.filter(leaves =>
        leaves.statutfac === "FACTURE"
       );


  const filtredoc = dossierfiltred.filter(leaves =>
        leaves.nbDossier.toLowerCase().includes(recherche.toLowerCase())
       );

  const filtrenbfac = dossierfiltred.filter(leaves =>
        leaves.nbfact.toLowerCase().includes(rechnbfc.toLowerCase())
       );

   const filtreclient = dossierfiltred.filter(leaves =>
      leaves.client.toLowerCase().includes(rechclient.toLowerCase())
      );

   const filtredate = dossierfiltred.filter(leaves =>
      leaves.datefacture.toLowerCase().includes(rechdate.toLowerCase())
      );


   

  return (

    <>
    
    {user.poste === "Secretaire" ? 
    <SidebarLayout title="Liste de Dossiers" items={navItems}> 

    <section className="glass-card p-4 sm:p-5">

       


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


                {

                

                  dossierfiltre.map((leave)=> (
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


                }

            

              </tbody>
            </table>
          </div>
        )}
      </section>
    
    </SidebarLayout>











    : user.poste === "Facturier" ?
    
    <SidebarLayout title="Dossiers Facturés" items={navItemsfac}>


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
          <option value="numerofac">Par N° facture</option>
          <option value="clients">Par Client</option>
          <option value="datefac">Par Date</option>
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
      
      :  rechercher === "numerofac" ?
       
       <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par N° Facture</label>
      <input 
        className="field"
        type="text" 
        placeholder="Rech. par N° Facture" 
        value={rechnbfc}
        onChange={(e) => setRechnbfc(e.target.value)}
      />

      </div>
 
      
      : rechercher === "clients" ?
       

       <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par Client</label>
      
       <select
          className="field"
          value={rechclient}
          onChange={(e) => setRechclient(e.target.value)}
          
        >
          <option value="" ></option>
          { dossierfiltred.map((leave)=> (
          <option value={leave.client} key={leave._id}> 
          {leave.client}
          </option>
          ))
          }
        </select>

      </div> 

       : rechercher === "datefac" ?
       

       <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">Rech. par Date</label>
      <input 
        className="field"
        type="date" 
        placeholder="Rech. par n° Client" 
        value={rechdate}
        onChange={(e) => setRechdate(e.target.value)}
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
                  <th>N° de Facture</th>
                  <th>Date de Facturation</th>
                  <th>Montant Facture</th>
                  <th>Deboours Douanes</th>
                  <th>Deboours Divers</th>
                  <th>Prestations</th>
                  
                   
                  
                </tr>
              </thead>
              <tbody>

                

               {  recherche ?
               

               
                filtredoc.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbfact}</td>
                    <td className="capitalize">{leave.datefacture} </td>
                   <td className="capitalize ">
                      {leave.montantfac ?
                      <>
                      {leave.montantfac} FCFA

                      </> : null

                      }
                      
                    </td>
                    <td className="capitalize">{leave.deb_douanes} FCFA</td>
                    <td className="capitalize">{leave.deb_divers} FCFA</td>
                    <td className="capitalize">{leave.montantprest} FCFA</td>
                   
                    
                  </tr>
                ))



                : rechnbfc?

                 filtrenbfac.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbfact}</td>
                    <td className="capitalize">{leave.datefacture} </td>
                   <td className="capitalize ">
                      {leave.montantfac ?
                      <>
                      {leave.montantfac} FCFA

                      </> : null

                      }
                      
                    </td>
                    <td className="capitalize">{leave.deb_douanes} FCFA</td>
                    <td className="capitalize">{leave.deb_divers} FCFA</td>
                    <td className="capitalize">{leave.montantprest} FCFA</td>
                   
                    
                  </tr>
                ))


                : rechclient?

                  filtreclient.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbfact}</td>
                    <td className="capitalize">{leave.datefacture} </td>
                   <td className="capitalize ">
                      {leave.montantfac ?
                      <>
                      {leave.montantfac} FCFA

                      </> : null

                      }
                      
                    </td>
                    <td className="capitalize">{leave.deb_douanes} FCFA</td>
                    <td className="capitalize">{leave.deb_divers} FCFA</td>
                    <td className="capitalize">{leave.montantprest} FCFA</td>
                   
                    
                  </tr>
                ))



                : rechdate?


                  filtredate.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbfact}</td>
                    <td className="capitalize">{leave.datefacture} </td>
                   <td className="capitalize ">
                      {leave.montantfac ?
                      <>
                      {leave.montantfac} FCFA

                      </> : null

                      }
                      
                    </td>
                    <td className="capitalize">{leave.deb_douanes} FCFA</td>
                    <td className="capitalize">{leave.deb_divers} FCFA</td>
                    <td className="capitalize">{leave.montantprest} FCFA</td>
                   
                    
                  </tr>
                ))



                :


                dossierfiltred.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.nbfact}</td>
                    <td className="capitalize">{leave.datefacture} </td>
                   <td className="capitalize ">
                      {leave.montantfac ?
                      <>
                      {leave.montantfac} FCFA

                      </> : null

                      }
                      
                    </td>
                    <td className="capitalize">{leave.deb_douanes} FCFA</td>
                    <td className="capitalize">{leave.deb_divers} FCFA</td>
                    <td className="capitalize">{leave.montantprest} FCFA</td>
                   
                    
                  </tr>
                ))

            

                }



              </tbody>
            </table>
          </div>
        )}
      </section>



    </SidebarLayout> 

    
    :






    //Autre

     <SidebarLayout title="Liste de Dossiers" items={navItemsd}>


      <section className="glass-card p-4 sm:p-5">




        





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
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                
                {leavess.map((leave) => (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">{leave.nbColis} colis de {leave.poids} Kg</td>
                    <td>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize">
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>



    </SidebarLayout> 

      }
      
   
    </>
  );
};

export default Factures;
