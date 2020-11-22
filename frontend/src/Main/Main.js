import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SearchBlock from "../SearchBlock/SearchBlock";
import SearchResults from "../SearchResults/SearchResults";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Main = (props) => {
  const classes = useStyles();

  return (
    <Grid container sx={12} alignItems="stretch">
      <Grid container item justify="center" className={classes.root}>
        <Grid
          container
          item
          xs={12}
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Grid container item xs={12} sm={8} md={6} lg={4}>
            <SearchBlock />
          </Grid>
          <Grid container item xs={12} sm={8} md={6} lg={4}>
            <SearchResults />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
