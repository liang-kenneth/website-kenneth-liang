import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Modal,
  Link,
  TextField,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Axios from "axios";
import generateKey from "../generate-key.js";

function Pokedex() {
  // ------------------------------------------------------------
  // Initialize useState variables
  const [pokemonList, setPokemonlist] = useState({});
  const [pokemonData, setPokemonData] = useState({
    id: "",
    name: "",
    species: { url: "", name: "" },
    height: "",
    weight: "",
    types: [],
  });
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  // ------------------------------------------------------------

  // Get the list of 150 pokemons on initial page load
  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=150").then(function (
      response
    ) {
      const { data } = response;
      const { results } = data;
      const newPokemonList = {};
      results.forEach((pokemon, index) => {
        newPokemonList[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      });

      setPokemonlist(newPokemonList);
    });
  }, []);

  // ------------------------------------------------------------
  // Handle open/close of modal, obtain the appropriate Pokemon data of the user selected Pokemon
  const handleOpen = (id) => {
    setOpen(true);

    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(function (response) {
        const { data } = response;
        const newPokemonData = {
          id: data.id,
          name: data.name,
          species: data.species,
          height: data.height,
          weight: data.weight,
          types: data.types,
        };

        setPokemonData(newPokemonData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setPokemonData({
      id: "",
      name: "",
      species: { url: "", name: "" },
      height: "",
      weight: "",
      types: [],
    });
  };
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // Pokemon name search filter
  const handleSearch = (e) => {
    setFilter(e.target.value.toLowerCase());
  };
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // A simple function to capitalize the first letter of the Pokemon name
  const toFirstCharUppercase = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // Modal card details when user selects a specific Pokemon
  const modalCard = () => {
    const { name, id, species, height, weight, types } = pokemonData;
    const fullImageUrl = `https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/${id}.svg`;

    return (
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h3">
            {`${id}. ${toFirstCharUppercase(name)}`}
          </Typography>
        </CardContent>
        <CardMedia
          className="cardMedia"
          image={fullImageUrl}
          style={{ width: "200px", height: "200px" }}
        />
        <CardContent>
          <Typography>
            Species: <Link href={species.url}>{species.name}</Link>
          </Typography>
          <Typography>Height: {height}</Typography>
          <Typography>Weight: {weight}</Typography>
          <Typography variant="h5">Types:</Typography>
          {types.map((typeInfo, index) => {
            return (
              <Typography key={generateKey(index)}>
                {typeInfo.type.name}
              </Typography>
            );
          })}
        </CardContent>
      </Card>
    );
  };
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // Generate the grid of 150 Pokemons
  const getPokemonCard = (pokemonId) => {
    const pokemon = pokemonList[pokemonId];
    const { name, id, sprite } = pokemon;

    return (
      <Grid item xs={4} key={generateKey(id)}>
        <Card onClick={() => handleOpen(id)}>
          <CardMedia
            className="cardMedia"
            image={sprite}
            style={{ width: "100px", height: "100px" }}
          />
          <CardContent className="cardContent">
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  // ------------------------------------------------------------

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#87ceeb",
        height: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", px: 2, my: 2 }}>
            <SearchIcon className="searchIcon" />
            <TextField
              label="Enter Pokemon name"
              variant="standard"
              onChange={handleSearch}
              sx={{ width: "200px", mx: 1, input: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {pokemonList ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2, px: 2, backgroundColor: "#87ceeb" }}
        >
          {Object.keys(pokemonList).map(
            (pokemonId) =>
              pokemonList[pokemonId].name.toLowerCase().includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        {pokemonData.id != "" ? modalCard() : <CircularProgress />}
      </Modal>
    </Box>
  );
}

export default Pokedex;
