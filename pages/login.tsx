// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "@components/Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../types";
import { login } from "../redux/actions/authActions";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "@components/Loader";
import Alert from '@components/Toast'; 

const LoginPage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false); // State for Toast component
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(login(data.token));
        console.log("Redirecting to dashboard...")
        router.push("/dashboard");
      } else {
        console.error("Login failed");
        showToast('error', 'Invalid login credentials');
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast('error',String(error));
    } finally {
      setLoading(false);
    }
  };

  const showToast = (severity: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <>
      <Navbar pageName="Home" />
      <div className="loginPage">
        <div className="loginComponent">
          {loading && <Loader />}
          <h2>Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
            aria-label="Username"
          />
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
      <Alert
        open={toastOpen}
        onClose={handleToastClose}
        severity={toastSeverity}
        message={toastMessage}
      />
    </>
  );
};

export default LoginPage;
