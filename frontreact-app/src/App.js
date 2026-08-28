import { Navigate, Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeavePage from "./pages/ApplyLeavePage";
import LeaveHistoryPage from "./pages/LeaveHistoryPage";
import EmployeeAnalyticsPage from "./pages/EmployeeAnalyticsPage";
import EmployeeTicketsPage from "./pages/EmployeeTicketsPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerAnalyticsPage from "./pages/ManagerAnalyticsPage";
import AdminAnalyticsPage from "./pages/AdminDashboard";
import AdminDashboard from "./pages/AdminAnalyticsPage";
import AdminTicketsPage from "./pages/AdminTicketsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Oneleave from "./pages/OneLeave";
import { useParams } from "react-router-dom";
import Bpa from "./pages/bpa";
import Bc from "./pages/bc";
import Factures from "./pages/factures";
import Releve from "./pages/releves";
import Assurance from "./pages/Assurance";
import Exo from "./pages/Exo";
import Declaration from "./pages/Declaration";
import Regularisation from "./pages/Regularisation";
import Bae from "./pages/Bae";

function App() {

  const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin/analytics" replace />;
  if (user.role === "manager") return <Navigate to="/manager" replace />;
  return <Navigate to="/employee" replace />;
  };


  return (
  
    
   <Routes>
    <Route path="/" element={<HomeRedirect />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />

    <Route
      path="/employee"
      element={
        <ProtectedRoute roles={["employee"]}>
          <EmployeeDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employee/apply"
      element={
        <ProtectedRoute roles={["employee"]}>
          <ApplyLeavePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employee/history"
      element={
        <ProtectedRoute roles={["employee"]}>
          <LeaveHistoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employee/analytics"
      element={
        <ProtectedRoute roles={["employee"]}>
          <EmployeeAnalyticsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employee/tickets"
      element={
        <ProtectedRoute roles={["employee"]}>
          <EmployeeTicketsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/manager"
      element={
        <ProtectedRoute roles={["manager"]}>
          <ManagerDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/manager/analytics"
      element={
        <ProtectedRoute roles={["manager"]}>
          <ManagerAnalyticsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/user"
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/analytics"
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminAnalyticsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/tickets"
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminTicketsPage />
        </ProtectedRoute>
      }
    />

    <Route
      path="/onleave/:id"
      element={
        <ProtectedRoute roles={["employee"]}>
          <Oneleave />
        </ProtectedRoute>
      }
    />

    <Route
      path="/bpafac"
      element={
        <ProtectedRoute>
          <Bpa />
        </ProtectedRoute>
      }
    />


    <Route
      path="/bcfac"
      element={
        <ProtectedRoute>
          <Bc />
        </ProtectedRoute>
      }
    />

    <Route
      path="/factures"
      element={
        <ProtectedRoute>
          <Factures />
        </ProtectedRoute>
      }
    />

    <Route
      path="/releves"
      element={
        <ProtectedRoute>
          <Releve />
        </ProtectedRoute>
      }
    />

    <Route
      path="/assurance"
      element={
        <ProtectedRoute>
          <Assurance />
        </ProtectedRoute>
      }
    />

    <Route
      path="/exo"
      element={
        <ProtectedRoute>
          <Exo />
        </ProtectedRoute>
      }
    />
    <Route
      path="/declaration"
      element={
        <ProtectedRoute>
          <Declaration />
        </ProtectedRoute>
      }
    />

    <Route
      path="/regul"
      element={
        <ProtectedRoute>
          <Regularisation />
        </ProtectedRoute>
      }
    />

    <Route
      path="/bae"
      element={
        <ProtectedRoute>
          <Bae />
        </ProtectedRoute>
      }
    />

  
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>

   
 
  );
}

export default App;
