import React, { useEffect, useState, } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import LeaveHistoryPage from "./LeaveHistoryPage";
import { Route } from "react-router-dom";
import { Axios } from "axios";


const OnelyUser = () => {
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

  const navItemsa = [
    { to: "/admin/analytics", label: "Suivi des Dossiers" },
    { to: "/history", label: "Liste Dossiers" },
    { to: "/admin/user", label: "Gestion Utilisateurs" },
    { to: "/bpafac", label: "En attente de BPA" },
    { to: "/bcfac", label: "En attente de BC" },
    { to: "/factures", label: "Factures" },
    { to: "/releves", label: "Relevés" },
    { to: "/assurance", label: "Assurances" },
    { to: "/exo", label: "Exo" },
    { to: "/declaration", label: "Declaration" },
    { to: "/regul", label: "Regularisation" },
    { to: "/bae", label: "BAE" },
    { to: "/admin/tickets", label: "Messages" }
  ];


 let navb = "";

if (user.poste === "Secretaire") {

   navb =  navItems;

} else if ( user.poste === "Logisticien") {

  navb =  navItemsl;

} else if ( user.poste === "Facturier") {

  navb =  navItemsfac;

} else if ( user.poste === "Declarant") {

  navb =  navItemsd;

} else if ( user.role === "admin") {

  navb =  navItemsa;

}
 
  

  return (

    <>
     
    
    
    
    <SidebarLayout title="Profil"

    items={navb}

    > 
     
     
   

  

       <div className="glass-card mx-auto max-w-3xl space-y-4 p-5 sm:p-8">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      
      <div className="grid mb-10 gap-4 md:grid-cols-2">
          <div className="text-right">

         {user?.name}

         </div>  
 
         <div className="text-right">

          <Link className=" w-full  rounded-full bg-blue-100 px-3 py-3 text-xs font-semibold text-teal-1"
              to={"/onlyuserupt/"+user._id}
              >
             Modifier votre mot de passe
             </Link>

            </div>
          

      </div>

      <h1>
       <div className="auth-form-pane">

        <div className="auth-form-inner">

          <div className="text-center">Poste : {user?.poste}</div>

          <div className="text-center">Role : {user?.role}</div>
        
          
        
        
         
        </div>

               
     </div>

     

     </h1>

     </div>


     </SidebarLayout>

   

    
      
   
    </>
  
  );

};


export default OnelyUser;