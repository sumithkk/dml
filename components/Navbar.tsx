import React, { useEffect, useState } from "react";
import logo from "../icons/logo.svg";
import Image from "next/image";
import { AppDispatch } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/actions/authActions";
import { useRouter } from "next/router";

interface NavbarProps {
  pageName: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  useEffect(() => {
    console.log("Navbar rendered...");
    console.log("fomr Navbar", loggedIn)
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="navbar-logo">
            <Image src={logo} alt="logo" width={60} height={60} />
          </div>
          <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/careers">Careers</a>
            <a href="/history">History</a>
            <a href="/services">Services</a>
            <a href="/projects">Projects</a>
            <a href="/blog">Blog</a>
            <a href="/dashboard">Dashboard</a>
          </div>
        </div>
        <div className="navbar-buttons">
          {!loggedIn ? (
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          )}

          <button className="register-button">Register</button>
        </div>

        <div className="navbar-mobile-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
