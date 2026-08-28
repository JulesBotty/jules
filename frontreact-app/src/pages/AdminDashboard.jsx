
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import SidebarLayout from "../components/SidebarLayout";
import client from "../api/client";
import getApiErrorMessage from "../utils/getApiErrorMessage";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  ChartDataLabels
);

const AdminAnalyticsPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [trendType, setTrendType] = useState("bar");
  const hasLoadedRef = useRef(false);
  const [chartKey, setChartKey] = useState(0);

  const navItems = [
    { to: "/admin/analytics", label: "Suivi des Dossiers" },
    { to: "/admin/user", label: "Gestion Utilisateurs" },
    { to: "/admin/tickets", label: "Messages" }
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/leaves/mya");
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
  

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const loadAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await client.get("/users/analytics");
        setAnalytics(data);
        setTimeout(() => setChartKey((k) => k + 1), 120);
      } 
      catch (err) {
        const msg =
          err?.response?.status === 404
            ? "Analytics API missing. Restart backend so /api/users/analytics route loads."
            : getApiErrorMessage(err, "Unable to load analytics");
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  const userPieData = useMemo(
    () => ({
      labels: ["Maritimes", "Aériens", "Terrestres", "Prestations"],
      datasets: [
        {
          label: "Part de Dossier",
          data: analytics
            ? [analytics.totals.Maritimes, analytics.totals.Aeriens, analytics.totals.Terrestres, analytics.totals.Prestations]
            : [0, 0, 0],
          backgroundColor: ["#2563eb", "#06b6d4", "#10b981", "#111111"],
          borderColor: "#ffffff",
          borderWidth: 2
        }
      ]
    }),
    [analytics]
  );

  

  const trendData = useMemo(
    () => ({
      labels: analytics ? analytics.monthlyUsers.map((m) => m.month) : [],
      datasets: [
        {
          label: "Users Created",
          data: analytics ? analytics.monthlyUsers.map((m) => m.total) : [],
          backgroundColor: "rgba(14, 165, 233, 0.45)",
          borderColor: "#0ea5e9",
          borderWidth: 3,
          fill: true,
          tension: 0.32,
          pointRadius: 4,
          pointBackgroundColor: "#0369a1"
        }
      ]
    }),
    [analytics]
  );

  const leaveDoughnutData = useMemo(
    () => ({
      labels: ["Approved", "Rejected"],
      datasets: [
        {
          label: "Leave Status",
          data: analytics
            ? [ analytics.leaves.approved, analytics.leaves.rejected]
            : [0, 0, 0],
          backgroundColor: ["#f59e0b", "#10b981", "#ef4444"],
          borderColor: "#ffffff",
          borderWidth: 2
        }
      ]
    }),
    [analytics]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900, easing: "easeOutQuart" },
    scales: {
      y: {
        min: 0,
        max: 50,
        ticks: { stepSize: 10, color: "#334155" },
        grid: { color: "rgba(148,163,184,0.25)" }
      },
      x: {
        ticks: { color: "#334155" },
        grid: { color: "rgba(148,163,184,0.16)" }
      }
    },
    plugins: {
      legend: {
        labels: { color: "#0f172a", font: { weight: "600" } }
      },
      datalabels: {
        color: "#0f172a",
        font: { weight: "700" },
        formatter: (value, context) => {
          if (context.chart.config.type === "pie" || context.chart.config.type === "doughnut") {
            const data = context.dataset.data || [];
            const total = data.reduce((sum, item) => sum + Number(item || 0), 0);
            if (!total) return "0";
            const percent = Math.round((value / total) * 100);
            return `${value} (${percent}%)`;
          }
          return String(value);
        },
        anchor: "end",
        align: "top",
        offset: 2,
        clamp: true
      }
    }
  };

  return (
    <SidebarLayout title="Suivi des Dossiers" items={navItems}>
      {error && <p className="glass-card rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
      <div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <h2>
          <p  className="bm-6 text-3xl font-extrabold">Total Dossiers :{analytics?.leaves.total || 0}</p>
          </h2> 
        </div>

       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
        <div className="glass-card p-4">
          <p className="text-sm text-slate-500">Dossiers Maritimes</p>
          <p className="text-3xl font-extrabold text-blue-600">{analytics?.leaves.Maritime || 0}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-slate-500">Dossiers Aériens</p>
          <p className="text-3xl font-extrabold text-cyan-600">{analytics?.leaves.Aerien || 0}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-slate-500">Dossiers Terrestres</p>
          <p className="text-3xl font-extrabold text-emerald-600">{analytics?.leaves.Terrestre || 0}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-slate-500">Dosseirs Prestations</p>
          <p className="text-3xl font-extrabold">{analytics?.leaves.Prestation || 0}</p>
        </div>


      </div>


      </div>
      

      {loading ? (
        <div className="glass-card p-5">
          <p className="text-slate-500">Chargement...</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          <section className="glass-card border border-emerald-100/70 p-4 sm:p-5 xl:col-span-2">
            <h2 className="mb-1 text-xl font-bold">Distribution</h2>
            <p className="mb-3 text-sm text-slate-500"></p>
            <div className="h-72">
              <Pie key={`admin-role-pie-${chartKey}`} data={userPieData} options={chartOptions} />
            </div>
          </section>
         {/**
          <section className="glass-card border border-blue-100/60 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Monthly User Trend</h2>
                <p className="text-sm text-slate-500">Y-axis fixed from 0 to 50 users.</p>
              </div>
              <div className="flex rounded-xl border border-slate-300 bg-white/70 p-1">
                <button
                  type="button"
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    trendType === "bar" ? "bg-slate-900 text-white" : "text-slate-600"
                  }`}
                  onClick={() => setTrendType("bar")}
                >
                  Histogramme
                </button>
                <button
                  type="button"
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    trendType === "line" ? "bg-slate-900 text-white" : "text-slate-600"
                  }`}
                  onClick={() => setTrendType("line")}
                >
                  Ligne
                </button>
              </div>
            </div>
            <div className="h-72">
              {trendType === "bar" ? (
                <Bar key={`admin-trend-bar-${chartKey}`} data={trendData} options={chartOptions} />
              ) : (
                <Line key={`admin-trend-line-${chartKey}`} data={trendData} options={chartOptions} />
              )}
            </div>
          </section>

         <section className="glass-card border border-emerald-100/60 p-4 sm:p-5 xl:col-span-2">
            <h2 className="mb-1 text-xl font-bold">Leave Workflow Status (Doughnut)</h2>
            <p className="mb-3 text-sm text-slate-500">
               approved, and rejected requests.
            </p>
            <div className="h-80">
              <Doughnut
                key={`admin-leave-doughnut-${chartKey}`}
                data={leaveDoughnutData}
                options={chartOptions}
              />
            </div>
          </section> */} 

        <section className="glass-card border border-emerald-100/70 p-4 sm:p-5 xl:col-span-2">
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
                {leaves.map((leave) => (
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



          
        </div>
      )}
    </SidebarLayout>
  );
};

export default AdminAnalyticsPage;