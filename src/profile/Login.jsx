import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../context/authContext";
import "./profile.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [resend, setResend] = useState(false);
  const [err, setErr] = useState("");
  const [seconds, setSeconds] = useState();
  const { login } = useContext(AuthContext);
  const [disableOtp, setDisableOtp] = useState(false);
  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
      otp: otp,
    };
    try {
      const err = await login(data);
      setErr(err);
    } catch (err) {
      setErr(err.response?.data || "Login failed");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        setSeconds(null);
        setResend(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACK_API}/auth/mail`, {
        email: email,
      });
      setSeconds(30);
      setResend(true);
    } catch (err) {
      setErr(err.response?.data || "OTP request failed");
    }
  };

  return (
    <div className="parent-login">
      <div className="loginn">
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Login to your account
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          value={email}
          margin="dense"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          size="small"
          value={password}
          fullWidth
          margin="dense"
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          value={otp}
          margin="dense"
          size="small"
          onChange={(e) => setOtp(e.target.value)}
        />

        <Box display="flex" justifyContent="space-between" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOtp}
            disabled={resend || disableOtp}
            fullWidth
            style={
              resend || disableOtp
                ? { backgroundColor: "gray" }
                : { backgroundColor: "rgb(181, 110, 248)" }
            }
          >
            {resend ? `Resend in ${seconds}` : "Send OTP"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {err && (
          <Typography color="error" variant="body2" align="center" mt={2}>
            {err}
          </Typography>
        )}

        <Box mt={2} textAlign="center">
          <Button variant="outlined" color="secondary">
            <Link className="link" to="/forgot">
              Forgot Password
            </Link>
          </Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Button
            onClick={() => {
              setEmail("testteacher@test.com");
              setPassword("123456789");
              setOtp("236031");
              setDisableOtp(true);
            }}
            sx={{ textTransform: "none" }}
            variant="outlined"
            color="secondary"
          >
            Instant Login as Teacher
          </Button>
          <Button
            onClick={() => {
              setEmail("teststudent@test.com");
              setPassword("123456789");
              setOtp("273840");
              setDisableOtp(true);
            }}
            sx={{ textTransform: "none" }}
            mt={2}
            variant="outlined"
            color="secondary"
          >
            Instant Login as Student
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
