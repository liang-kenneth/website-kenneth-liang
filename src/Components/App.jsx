import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Grid } from "@mui/material";
import About from "./About.jsx";
import Portfolio from "./Portfolio.jsx";
import Resume from "./Resume.jsx";
import Pokedex from "./Pokedex.jsx";
import Notes from "./Notes.jsx";
import Wordle from "./Wordle.jsx";
import SideNav from "./SideNav.jsx";

function App() {
  return (
    <Grid
      container
      wrap="nowrap"
      height="100vh"
      display="flex"
      sx={{
        pt: 2,
        mx: "auto",
        width: "75%",
        borderLeft: 1,
        borderRight: 1,
        borderColor: "white",
        backgroundColor: "white",
      }}
      justifyContent="center"
    >
      <CssBaseline />
      <BrowserRouter>
        <Grid
          item
          sx={{
            width: "250px",
            textAlign: "center",
          }}
        >
          <SideNav />
        </Grid>
        <Grid
          item
          sx={{
            ml: 3,
          }}
          flex={1}
          overflow="auto"
        >
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/wordle" element={<Wordle />} />
          </Routes>
        </Grid>
      </BrowserRouter>
    </Grid>
  );
}

export default App;
