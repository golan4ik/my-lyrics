import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SearchBlock from "../SearchBlock/SearchBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
  },
}));

const Content = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid container item sx={12} md={8}>
        <SearchBlock />
      </Grid>
    </Grid>
  );
};

export default Content;
