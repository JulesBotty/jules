import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import client from "../api/client";
import SidebarLayout from "../components/SidebarLayout";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";

const EmployeeDashboard = () => {
  const [summary, setSummary] = useState({ approved: 0, rejected: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [leavess, setLeavess] = useState([]);

  const { user } = useAuth();


  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [summaryRes, leavesRes] = await Promise.all([
          client.get("/leaves/summary/my"),
          client.get("/leaves/my")
        ]);
        setSummary(summaryRes.data.summary);
        setRecent(leavesRes.data.leaves.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load dashboard");
        toast.error(err.response?.data?.message || "Unable to load dashboard");
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


  const navItems = [
    { to: "/employee", label: "Dashboard" },
    { to: "/employee/apply", label: "Ouverture Dossiers" },
    { to: "/employee/history", label: "Liste Dossiers" },
    { to: "/employee/analytics", label: "Rapport" },
    { to: "/employee/tickets", label: "Message" }
  ];

   const navItemst = [
    { to: "/employee", label: "Dashboard" },
    { to: "/employee/apply", label: "Ouverture Dossiers" },
    { to: "/employee/history", label: "Liste Dossiers" },
    { to: "/employee/analytics", label: "Rapport" },
    { to: "/employee/tickets", label: "Message" }
  ];

  

  return (

    <>

    { user.poste === "Secretaire" ?
     
    <SidebarLayout title="Suivi de Dossiers" items={navItems}>
      {error && <p className="glass-card rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
       
        <Link
          to="/employee/apply"
          className="glass-card flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-4 font-bold text-white transition-transform duration-300 hover:-translate-y-1"
        >
          + Dossier
        </Link>
      </div>

    

       <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Récemment ouvert</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : recent.length === 0 ? (
          <p className="text-slate-500">Pas de dossiers ouverts</p>
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
                  
                </tr>
              </thead>
              <tbody>
                {recent.map((leave) => (
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
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

       </SidebarLayout>




      :  user.poste === "Logisticien" ?


      <SidebarLayout title="Suivi de Dossiers" items={navItemst}>
      {error && <p className="glass-card rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
       
        <Link
          to="/employee/apply"
          className="glass-card flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-4 font-bold text-white transition-transform duration-300 hover:-translate-y-1"
        >
          + Dossier
        </Link>
      </div>


       <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Récemment ouvert</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : leavess.length === 0 ? (
          <p className="text-slate-500">Pas de dossiers ouverts</p>
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
                    <td className="capitalize">
                      { leave.poids ?
                        <> 
                         {leave.nbColis} colis de {leave.poids} Kg
                        </>
                         :

                         null

                      }
                      
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

       </SidebarLayout>

      :

      null


      }

      </>
      
   
  );
};

export default EmployeeDashboard;
