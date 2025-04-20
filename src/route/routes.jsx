import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/index.jsx';
import Layout from '../components/layout.jsx';
import Type from '../pages/type/index.jsx';
import Product from '../pages/product/product.jsx';
import Employee from '../pages/employee/employee.jsx';
import Department from '../pages/department/department.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} /> 
        <Route path="dashboard" element={<Dashboard />} /> 
        <Route path="type" element={<Type />} />
        <Route path="product" element={<Product />} />
        <Route path="employee" element={<Employee />} />
        <Route path="department" element={<Department />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
