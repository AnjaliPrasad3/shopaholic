import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UploadAvatar from "./components/user/UploadAvatar";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPasword from "./components/auth/ResetPasword";
import Cart from './components/cart/cart'
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";


function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPasword />} />

            <Route path="/me/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/me/update_profile" element={<ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>} />
            <Route path="/me/upload_avatar" element={<ProtectedRoute>
              <UploadAvatar />
            </ProtectedRoute>} />
            <Route path="/me/update_password" element={<ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ProtectedRoute>
              <Shipping />
            </ProtectedRoute>} />
            <Route path="/confirm_order" element={<ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
