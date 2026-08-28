import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const Bpa = () => {
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
  const dossierfiltre = leavess.filter(leaves =>
        leaves.statutfac === "BPA et BC"
       );


 const dossierfiltred = leavess.filter(leaves =>
        leaves.statutfac === "BPA et BC"
       );



   

  return (

    <>
    
    {user.poste === "Secretaire" ? 
    <SidebarLayout title="Dossiers en attente de Bon por Accord" items={navItems}> 

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
    
    <SidebarLayout title="Dossiers en attente de Bon por Accord" items={navItemsfac}>


      <section className="glass-card p-6 sm:p-2">


       




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
                  <th>Date de Depôt</th>
                  <th>STATUT</th>
                   <th></th>
                  
                </tr>
              </thead>
              <tbody>          

               {  
               

               
               dossierfiltred.map((leave)=> (
                  <tr key={leave._id}>
                    <td className="capitalize">{leave.nbDossier}</td>
                    <td className="capitalize">{leave.cetegorie} {leave.leaveType}</td>
                    <td className="capitalize">{leave.client}</td>
                    <td className="capitalize">{leave.nbOt}</td>
                    <td className="capitalize">{leave.nbltabl}</td>
                    <td className="capitalize">{leave.datedepos} </td>
                   <td className="capitalize ">
                      {leave.statutfac ?
                      <>
                      En attente de  {leave.statutfac}

                      </> : null

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
                  <th>Date de Depôt</th>
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

export default Bpa;
