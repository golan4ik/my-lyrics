import React, { useEffect } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import { parseSearchResponse } from "../utils/parsers";

const searchLyrics = (term) => {
  console.log("Searching: ", term);
  const token =
    "Z1saa3X-ajrGluZb8iX8l96udGf78nNT_iOvd-Rjlq2w2Q0kq1PrhDzZKnw1uE8l";
  return axios
    .get(`http://api.genius.com/search?q=${term}&access_token=${token}`)
    .then((res) => {
      return parseSearchResponse(res.data);
    })
    .catch((e) => {
      console.error(e);
    });
};

const styles = makeStyles((theme) => {
  return {
    root: {
      marginTop: `${theme.spacing() * 2}px`,
    },
  };
});

const SearchBlock = (props) => {
  const classes = styles();
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      searchLyrics(e.target.value).then((results) => {
        console.log(results);
      });
    }
  };

  return (
    <Grid container>
      <Grid className={classes.root} container item justify="center" xs={12}>
        <TextField label="Search" variant="outlined" size="small" onKeyUp={onKeyUp} focus="true" />
      </Grid>
    </Grid>
  );
};

export default SearchBlock;
