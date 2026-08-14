import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminProjectForm from "./AdminProjectForm";
import AdminProjects from "./AdminProjects";
import "./Admin.css";
import AdminSiteSettings from "./AdminSiteSettings";

function Admin() {
const [loggedIn, setLoggedIn] = useState(false);
const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
const checkAuth = async () => {
try {
const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/admin/me`,
{
credentials: "include",
}
);


    if (response.ok) {
      setLoggedIn(true);
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
  } finally {
    setCheckingAuth(false);
  }
};

checkAuth();


}, []);

const handleLogout = async () => {
try {
await fetch(
`${import.meta.env.VITE_API_URL}/api/admin/logout`,
{
method: "POST",
credentials: "include",
}
);

  setLoggedIn(false);
} catch (error) {
  console.error("Logout failed:", error);
}


};

if (checkingAuth) {
return ( <div className="admin-loading">
Checking authentication... </div>
);
}

if (!loggedIn) {
return <AdminLogin onLogin={() => setLoggedIn(true)} />;
}

return ( <div className="admin-dashboard">


  <header className="admin-header">

    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage your portfolio projects</p>
    </div>

    <button
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>

  </header>

  <main className="admin-content">
    <section className="admin-section">
  <AdminSiteSettings />     
  
</section>
    <section className="admin-section">
      <AdminProjectForm />
    </section>

    <section className="admin-section">
      <AdminProjects />
    </section>

  </main>

</div>

);
}

export default Admin;
