import React from "react";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import {
  Email,
  FolderSpecial,
  GitHub,
  LinkedIn,
  Person,
  WorkHistory,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import profile from "../Assets/profile_pic.png";
import generateKey from "../generate-key.js";

function SideNav(props) {
  const navigate = useNavigate(); //From react-router-dom, needed to redirect website components

  const year = new Date().getFullYear(); //Get current year

  const listItem = [
    {
      text: "About",
      icon: <Person />,
      link: () => navigate("/about"),
    },
    {
      text: "Portfolio",
      icon: <FolderSpecial />,
      link: () => navigate("/portfolio"),
    },
    {
      text: "Resume",
      icon: <WorkHistory />,
      link: () => navigate("/resume"),
    },
  ];

  return (
    <>
      <Stack alignItems="center">
        <Avatar
          src={profile}
          alt="Kenneth Liang"
          sx={{ width: 150, height: 150 }}
        />
        <Typography sx={{ m: 1 }} variant="h4">
          Kenneth Liang
        </Typography>
        <Divider sx={{ my: 1, width: "90%" }} />
        <List>
          {listItem.map((item, index) => {
            const { text, icon, link } = item;

            return (
              <ListItem button onClick={link} key={generateKey(index)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider sx={{ my: 1, width: "90%" }} />
        <Grid
          sx={{ my: 1 }}
          alignItems="center"
          justifyContent="center"
          container
          columns={{ xs: 4, sm: 8, md: 12, l: 16 }}
        >
          <Grid sx={{ mx: 1 }}>
            <a href="https://www.linkedin.com/in/liang-kenneth">
              <LinkedIn fontSize="large" />
            </a>
          </Grid>
          <Grid sx={{ mx: 1 }}>
            <a href="https://github.com/liang-kenneth">
              <GitHub fontSize="large" />
            </a>
          </Grid>
          <Grid sx={{ mx: 1 }}>
            <a href="mailto:kenneth.liang@gmail.com">
              <Email fontSize="large" />
            </a>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1, width: "90%" }} />
        <Typography
          sx={{
            mt: 5,
          }}
        >
          Copyright ⓒ {year}
        </Typography>
      </Stack>
    </>
  );
}

export default SideNav;
