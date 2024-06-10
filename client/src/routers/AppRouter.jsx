import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/loginSignUp/Register";
import ForgatForm from "../components/loginSignUp/ForgotPassword";
import NotFound404 from "../pages/NotFound404";
import DashBoard from "../pages/DashBoard";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Brands from "../pages/Brands";
import Firms from "../pages/Firms";
import Sales from "../pages/Sales";
import Purchases from "../pages/Purchases";
import Products from '../pages/Products';



const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/reset" element={<ForgatForm/>}/>
        <Route path="*" element={<NotFound404/>}/>
        <Route path="/stock" element={<PrivateRouter/>}>
          <Route path="" element={<DashBoard/>}>
            <Route index element={<Home/>}/>
            <Route path="brands" element={<Brands/>} exact/>
            <Route path="firms" element={<Firms/>} exact/>
            <Route path="products" element={<Products/>} exact/>
            <Route path="purchases" element={<Purchases/>} exact/>
            <Route path="sales" element={<Sales/>} exact/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;