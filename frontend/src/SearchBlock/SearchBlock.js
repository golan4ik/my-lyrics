import React, { useEffect } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import { searchLyrics } from "../utils/networking";

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
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onKeyUp={onKeyUp}
          focus="true"
        />
      </Grid>
    </Grid>
  );
};

export default SearchBlock;
