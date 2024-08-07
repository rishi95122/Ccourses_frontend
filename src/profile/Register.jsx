import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { AuthContext } from '../context/authContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('Teacher');
  const { register } = useContext(AuthContext);
  const [err, setErr] = useState('');

  const handleRegister = async () => {
    if(!email)
     {
      setErr("Enter email")
      return;
     }
    if(password.length<=8)
    {
      setErr("Password must be greater than 8")
      return
    }
    if(username.length<=3)
      {
        setErr("Username must be greater than 3")
        return
      }
    const data = {
      email: email,
      username: username,
      password: password,
      user: user,
    };

    try {
      const err = await register(data);
      setErr(err);
    } catch (err) {
      setErr('Registration failed. Please try again.');
    }
  };

  return (
    <div className="parent-login">
      <div className="register">
        <Typography variant="h5" sx={{fontWeight:"bold"}}>Create a new account</Typography>
        
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          size='small'
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth 
           size='small'
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>User Type</InputLabel>
          <Select
            value={user}
              size='small'
            label="User Type"
            onChange={(e) => setUser(e.target.value)}
          >
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
        </FormControl>
        
        <TextField 
          label="Password" 
          variant="outlined" 
          type="password" 
          fullWidth 
            size='small'
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Box marginTop={2}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>

        {err && <Typography color="error" variant="body2" align="center">{err}</Typography>}

        <Box  textAlign="center">
          <Button variant="outlined" color="secondary" fullWidth>
            <Link className="link" to="/login">Login</Link>
          </Button>
        </Box>
      
      </div>
    </div>
  );
};

export default Register;
