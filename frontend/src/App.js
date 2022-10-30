import logo from './logo.svg';
import './App.css';
import { Button, Typography } from "@mui/material"

function App() {
  return (
    <div className="App">
      <Typography>Typgoraphy is used to default text</Typography>
      <Button sx={{ width: "450px", justifyContent: "center" }} variant="contained">Contained</Button>
    </div>
  );
}

export default App;
