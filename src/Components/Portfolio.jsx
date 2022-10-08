import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import projects from "../Project_Data.js";
import generateKey from "../generate-key.js";

function Portfolio() {
  const navigate = useNavigate(); //From react-router-dom, needed to redirect website components

  return (
    <>
      <Typography variant="h4">Projects</Typography>
      <Grid
        sx={{ mt: 1, p: 0.5 }}
        container
        spacing={2}
        justifyContent="center"
      >
        {projects.map((project, index) => {
          return (
            <Grid item key={generateKey(index)}>
              <Card
                sx={{
                  maxWidth: 250,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography variant="h5">{project.title}</Typography>
                </CardContent>
                <CardContent sx={{ height: 180 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Description:{" "}
                    <Typography component="span" sx={{ display: "inline" }}>
                      {project.description}
                    </Typography>
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Made With:{" "}
                    <Typography component="span" sx={{ display: "inline" }}>
                      {project.techStack}
                    </Typography>
                  </Typography>
                </CardContent>
                <CardActions sx={{ mx: "auto", mt: "auto" }}>
                  <Button href={project.link} size="large">
                    Try It!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Portfolio;
