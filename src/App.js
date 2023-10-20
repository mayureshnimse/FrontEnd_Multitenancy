import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import LandingPage from "./components/LandingPage";
import ModuleDetails from "./components/ModuleDetails";
import Login from "./pages/Login";
import SuperDashboard from "./dashboard/SuperDashboard";
import TenantDashboard from "./dashboard/TenantDashboard";
import CustomerDashboard from "./dashboard/CustomerDashboard";
import ModulesPage from "./pages/ModulesPage";
import TenantsPage from "./pages/TenantsPage";
import CreateModuleForm from "./pages/CreateModuleForm";
import CreateTenantForm from "./pages/CreateTenantForm";
import EditModuleForm from "./pages/EditModuleForm";
import EditTenantForm from "./pages/EditTenantForm";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/superadmin-dashboard" element={<SuperDashboard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/superadmin/modules" element={<ModulesPage />} />
          <Route path="/superadmin/tenants" element={<TenantsPage />} />
          <Route
            path="/superadmin/modules/create"
            element={<CreateModuleForm />}
          />
          <Route
            path="/superadmin/tenants/create"
            element={<CreateTenantForm />}
          />
          <Route
            path="/superadmin/modules/:moduleId/edit" element={<EditModuleForm />}
          />
          <Route
            path="/superadmin/tenants/:tenantId/edit" element={<EditTenantForm />}
          />
        </Routes>
      </BrowserRouter>

    </div>
  
  );
}
export default App;

//////////////////////////////////

// import './App.css';
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import ModuleDetails from './components/ModuleDetails';
// import Login from './pages/Login';
// import SuperDashboard from './dashboard/SuperDashboard';
// import TenantDashboard from './dashboard/TenantDashboard';
// import CustomerDashboard from './dashboard/CustomerDashboard';
// function App() {
//   const [user, setUser] = useState({
//     isAuthenticated: false,
//     role: null,
//   });
//   const handleSuccessfulLogin = (role) => {
//     if (role) {
//       setUser({
//         isAuthenticated: true,
//         role: role,
//       });
//     }
//   }
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login onSuccessfulLogin={handleSuccessfulLogin} />} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/module/:moduleId" element={<ModuleDetails />} />
//         <Route
//           path="/superadmin"
//           element={
//             user.isAuthenticated && user.role === 'superadmin' ? (
//               <SuperDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/tenant"
//           element={
//             user.isAuthenticated && user.role === 'tenant' ? (
//               <TenantDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/customer"
//           element={
//             user.isAuthenticated && user.role === 'customer' ? (
//               <CustomerDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }
// export default App;
