import React, { useState } from "react";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FolderSpecial, GitHub } from "@mui/icons-material";

function About() {
  const navigate = useNavigate(); //From react-router-dom, needed to redirect website components

  const [message, setMessage] = useState("(click to show email)");

  function handleMessage() {
    setMessage("kenneth.liang@gmail.com");
  }

  return (
    <>
      <Typography variant="h4">About</Typography>
      <Typography sx={{ my: 2 }}>
        Hi! I'm Kenneth and I'm currently a Business Consultant at a Canadian
        Telecom company. I have career aspirations in becoming a Full Stack and
        Smart Contract Developer.
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>The Journey</Typography>
      <Typography sx={{ display: "block", mb: 2 }}>
        Often I have ideas for web apps or games that I wasn't able to execute
        on. In 2021, I decided that being a user of apps wasn't enough anymore.
        I needed to be in the web and smart contract development space as an
        activite contributor. This website is the culmination of all my
        learnings so far and showcases my work.
      </Typography>
      <Typography>Thanks for visiting!</Typography>
      <Typography sx={{ my: 3, fontSize: 25, fontWeight: "bold" }}>
        Get In Touch!{" "}
        <Typography component="span" sx={{ display: "inline" }}>
          You can contact me at{" "}
          <Link underline="hover" onClick={handleMessage}>
            {message}
          </Link>
        </Typography>
      </Typography>

      <Typography variant="h4">My Work</Typography>
      <Link
        sx={{ display: "block", my: 3, fontSize: 25 }}
        underline="hover"
        onClick={() => navigate("/portfolio")}
      >
        <FolderSpecial sx={{ mr: 2 }} />
        Portfolio
        <Typography sx={{ ml: 5 }}>
          Personal projects showcased on this website
        </Typography>
      </Link>
      <Link
        sx={{ display: "block", mt: 3, fontSize: 25 }}
        underline="hover"
        href="https://github.com/liang-kenneth"
      >
        <GitHub sx={{ mr: 2 }} />
        Github
        <Typography sx={{ ml: 5 }}>Examples of my code</Typography>
      </Link>
    </>
  );
}

export default About;
