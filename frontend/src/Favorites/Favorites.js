import React from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import { useState } from "react";

const styles = makeStyles((theme) => {
  return {
    root: {
      marginTop: `${theme.spacing() * 2}px`,
    },
  };
});

function Favorites() {
  const [term, setTerm] = useState("");
  const classes = styles();

  return (
    <Grid justify="center" container xs={12} className={classes.root}>
      <Grid container justify="center" item xs={12} sm={8} md={6} lg={4}>
        <Grid item={12}>
          <TextField
            autoFocus
            label="Search"
            variant="outlined"
            size="small"
            onKeyUp={() => {}}
            onChange={() => {}}
            value={term}
            focus="true"
            disabled={false}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Favorites;
