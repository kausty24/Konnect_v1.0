
import RegisterCustomer from "./Register/RegisterCustomer";
import RegisterVendor from "./Register/RegisterVendor";
import { Routes, Route} from 'react-router-dom';
import VendorLogin from "./Login/VendorLogin";
import CustomerLogin from "./Login/CustomerLogin";
import VendorDashboard from "./Dashboard/VendorDashboard";
import CustomerDashboard from "./Dashboard/CustomerDashboard";
import HomePage from "./HomePage";
import ResponsiveDrawer from "./Layout/Sidebar";


function App() {

  return (
    <div>
      
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login/vendor" element={<VendorLogin/>}/>
        <Route path="/reg/customer" element={<RegisterCustomer/>}/>
        <Route path="/reg/vendor" element={<RegisterVendor/>}/>
        <Route path="/login/customer" element={<CustomerLogin/>}/>
        <Route path="/dashboard/vendor" element={<VendorDashboard/>}/>
        <Route path="/dashboard/customer" element={<CustomerDashboard/>}/>
        <Route path="/sidebar" element={<ResponsiveDrawer/>}/>
      </Routes>
      
      

    </div>
  );
}

export default App;
