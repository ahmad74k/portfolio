import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import AdminDashboard from './pages/admin/Dashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import ServicesManager from './pages/admin/ServicesManager';
import ContactSettings from './pages/admin/ContactSettings';
import Login from './pages/auth/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="contact" element={<ContactSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
