import React from "react";
import { Box, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { experiences, education, skills } from "../Resume_Data.js";
import generateKey from "../generate-key.js";

function Resume() {
  return (
    <>
      {/*--------------------------------------------------------
      Import the experiences, education and skills arrays from
      the Resume_Data.js file. 
       --------------------------------------------------------*/}
      <Typography sx={{ my: 1 }} variant="h5">
        TECHNICAL SKILLS
      </Typography>
      <Grid
        container
        sx={{ fontSize: 80 }}
        columns={{ xs: 4, sm: 8, md: 12, l: 16 }}
      >
        {skills.map((skill, index) => {
          return (
            <Grid item sx={{ mx: 1 }} key={generateKey(index)}>
              <span className={skill}></span>
            </Grid>
          );
        })}
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Typography sx={{ my: 1 }} variant="h5">
        EDUCATION
      </Typography>
      {education.map((item, index) => {
        return (
          <Box key={generateKey(index)}>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
              {item.course}
            </Typography>
            <Typography>{item.place}</Typography>
          </Box>
        );
      })}
      <Divider sx={{ my: 1 }} />
      <Typography sx={{ my: 1 }} variant="h5">
        EMPLOYMENT EXPERIENCE
      </Typography>
      {experiences.map((experience, index) => {
        const { role, company, feats } = experience;
        return (
          <Box key={generateKey(index)}>
            <Typography sx={{ fontWeight: "bold" }}>{role}</Typography>
            <Typography>{company}</Typography>
            <List sx={{ listStyleType: "disc" }}>
              {feats.map((feat, index) => {
                return (
                  <ListItem
                    sx={{
                      p: 0,
                      ml: 2.5,
                      display: "list-item",
                      width: "95%",
                    }}
                    key={generateKey(index)}
                  >
                    {feat}
                  </ListItem>
                );
              })}
            </List>
            <Divider sx={{ my: 1 }} />
          </Box>
        );
      })}
    </>
  );
}

export default Resume;
