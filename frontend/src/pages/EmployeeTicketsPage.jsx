import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import getApiErrorMessage from "../utils/getApiErrorMessage";
import { useAuth } from "../context/AuthContext";

const categoryOptions = [
  { value: "complaint_against_manager", label: "Complaint Against Manager" },
  { value: "leave_issue", label: "Leave Issue" },
  { value: "payroll_issue", label: "Payroll Issue" },
  { value: "policy_question", label: "Policy Question" },
  { value: "technical_support", label: "Technical Support" },
  { value: "other", label: "Other" }
];

const emptyTicket = {
  category: "",
  priority: "",
  subject: "",
  description: ""
};

const EmployeeTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(emptyTicket);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

   const { user } = useAuth();

  const navItems = [
    { to: "/employee", label: "Dashboard" },
    { to: "/employee/apply", label: "Ouverture de Dossiers" },
    { to: "/employee/history", label: "Liste des Dossiers" },
    { to: "/employee/analytics", label: "Rapport" },
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

  const loadTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await client.get("/tickets/my");
      setTickets(data.tickets || []);
    } catch (err) {
      const msg = getApiErrorMessage(err, "Unable to fetch tickets");
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitTicket = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await client.post("/tickets", form);
      toast.success("Ticket submitted to admin");
      setForm(emptyTicket);
      await loadTickets();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to submit ticket");
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
     <>

     {user.poste === "Secretaire" ?
     <SidebarLayout title="Envoi de Demande" items={navItems}>
      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-2 text-xl font-bold">Message</h2>
        <p className="mb-4 text-sm text-slate-500">
          Besoin d'aide ? Adressez une demande au Responsable concernant le traitement d'un dossier.
        </p>
        {error && <p className="mb-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}

        <form onSubmit={submitTicket} className="grid gap-3 md:grid-cols-2">
         {/** 
           <select className="field" name="category" value={form.category} onChange={onChange}>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select className="field" name="priority" value={form.priority} onChange={onChange}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          */}

          <input
            className="field md:col-span-2"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={onChange}
            required
          />

          <textarea
            className="field md:col-span-2"
            name="description"
            rows="5"
            placeholder="Describe your issue in detail"
            value={form.description}
            onChange={onChange}
            required
          />

          <button type="submit" className="btn-primary md:col-span-2 md:w-fit" disabled={submitting}>
            {submitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </section>

      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Mes Demandes</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : tickets.length === 0 ? (
          <p className="text-slate-500">Pas de Demandes.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <article key={ticket._id} className="rounded-xl border border-slate-200/80 bg-white/75 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-800">{ticket.subject}</h3>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    
                    <span className="rounded-full bg-sky-100 px-2 py-1 capitalize text-sky-700">
                      {ticket.category.replaceAll(" ", " ")}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-1 capitalize text-amber-700">
                      {ticket.priority}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 capitalize text-slate-700">
                      {ticket.status.replaceAll(" ", " ")}
                    </span>
                    
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-600">{ticket.description}</p>

                {ticket.adminReply ? (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
                    <p className="font-semibold text-emerald-700">
                     Reponse de {ticket.repliedByAdminName ? `(${ticket.repliedByAdminName})` : ""}
                    </p>
                    <p className="text-emerald-800">{ticket.adminReply}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    En attente de réponse.</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </SidebarLayout> 
    : 
    <SidebarLayout title="Envoi de Demande" items={navItemsd}>
      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-2 text-xl font-bold">Message</h2>
        <p className="mb-4 text-sm text-slate-500">
          Besoin d'aide ? Adressez une demande au Responsable concernant le traitement d'un dossier.
        </p>
        {error && <p className="mb-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}

        <form onSubmit={submitTicket} className="grid gap-3 md:grid-cols-2">
         {/** 
           <select className="field" name="category" value={form.category} onChange={onChange}>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select className="field" name="priority" value={form.priority} onChange={onChange}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          */}

          <input
            className="field md:col-span-2"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={onChange}
            required
          />

          <textarea
            className="field md:col-span-2"
            name="description"
            rows="5"
            placeholder="Describe your issue in detail"
            value={form.description}
            onChange={onChange}
            required
          />

          <button type="submit" className="btn-primary md:col-span-2 md:w-fit" disabled={submitting}>
            {submitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </section>

      <section className="glass-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold">Mes Demandes</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : tickets.length === 0 ? (
          <p className="text-slate-500">Pas de Demandes.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <article key={ticket._id} className="rounded-xl border border-slate-200/80 bg-white/75 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-800">{ticket.subject}</h3>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    
                    <span className="rounded-full bg-sky-100 px-2 py-1 capitalize text-sky-700">
                      {ticket.category.replaceAll(" ", " ")}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-1 capitalize text-amber-700">
                      {ticket.priority}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 capitalize text-slate-700">
                      {ticket.status.replaceAll(" ", " ")}
                    </span>
                    
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-600">{ticket.description}</p>

                {ticket.adminReply ? (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
                    <p className="font-semibold text-emerald-700">
                     Reponse de {ticket.repliedByAdminName ? `(${ticket.repliedByAdminName})` : ""}
                    </p>
                    <p className="text-emerald-800">{ticket.adminReply}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    En attente de réponse.</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </SidebarLayout>
     
     }


    

  </>
  );
};

export default EmployeeTicketsPage;
