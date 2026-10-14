import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { VscAccount } from "react-icons/vsc";
import { BsFillPersonFill } from "react-icons/bs";


const SidebarLayout = ({ title, items, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="glass-card h-fit overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-white lg:sticky lg:top-6">
          

          <nav className="mb-5 space-y-2">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                      : "bg-white/5 text-slate-100 hover:bg-white/15"
                  }`
                }
              >
                {item.label} 
              </NavLink>
            ))}
          </nav>

          <div className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
            <p className="font-semibold">{user?.name}</p>
            <p className="mb-3 capitalize text-slate-300">{user?.poste}</p>
            <button type="button" onClick={handleLogout} className="btn-danger w-full text-xs">
              Deconnexion
            </button>
          </div>
        </aside>

        <main className="space-y-4">
          <header className="glass-card flex items-center justify-between p-4 sm:p-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h1>
            

            <Link className="pulse-soft rounded-full bg-blue-400 px-3 py-3 text-xs font-semibold text-teal-5000"
            to={"/onlyuser/"+user._id}
            >
           <BsFillPersonFill  />
            </Link>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
