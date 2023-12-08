import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useRouter } from "next/router";
import { AppDispatch } from "../types";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Image from "next/image";
import backArrow from "../icons/backArrow.svg";

interface NavbarProps {
  pageName: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {router.route !== "/home" && (
          <Button color="inherit" onClick={handleBack}>
            <Image
              src={backArrow}
              alt="Your SVG Image"
              width={20}
              height={20}
            />
          </Button>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
