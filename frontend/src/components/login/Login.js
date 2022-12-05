// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CUSTOMER_API_URL } from "../../constants";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BrowserRouter, useNavigate } from 'react-router-dom';



// //Make an actual themem later once team decided on color scheme etc.
// const theme = createTheme();




// export default function SignIn() {

//   const [emails, setEmails] = useState([]);
//   const [passwords, setPasswords] = useState([]);
//   const [customers, setCustomers] = useState([]);

//   const [loginEmail, setLoginEmail] = useState("")

//   const [loginPassword, setLoginPassword] = useState("")

//   const navigate = useNavigate()


//   useEffect(() => {

//     axios.get(CUSTOMER_API_URL) //need to create an api where i can grab by typeID and branchID
//       .then((response) => {
//         setCustomers(response.data)

//         response.data.map((item, id) => {
//           setEmails(item.email)
//           setPasswords(item.password)
//         })

//       })

//   }, []);



//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     // console.log(emails);
//     // console.log(passwords);
//     // console.log(customers)
//     var emailString = data.get('email');
//     var passwordString = data.get('password')

//     // setLoginEmail(emailString)
//     // setLoginPassword(passwordString)

//     // console.log(emailString)
//     // console.log(passwordString)

//     customers.map((customer) => {
//       console.log(customer.email)
//       console.log(customer.password)

//       if (customer.email == emailString && customer.password == passwordString) {
//         navigate('/Rent')
//         console.log("SUCCESS")
//       }
//     })

//   };


//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus

//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/signUp" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }