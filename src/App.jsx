import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import './App.css'; // Import CSS for spinner
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((data) => {
      if (data) {
        dispatch(login({ userData: data }));
      } else {
        dispatch(logout());
      }
    }).finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default App;
