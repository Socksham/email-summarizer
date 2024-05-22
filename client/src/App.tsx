import React, { useEffect } from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Home from "./main/Home";
import { useNavigate, useLocation } from "react-router-dom";

export default function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { hash, pathname, search } = location;

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/");
      } else {
        if (!(pathname.includes("/login") || pathname.includes("/signup"))) {
          navigate("/login");
        }
      }
    }
  }, [user, loading, navigate, pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
