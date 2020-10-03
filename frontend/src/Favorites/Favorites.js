import React, { useEffect } from "react";
import { Grid, TextField, makeStyles, List } from "@material-ui/core";
import { useState } from "react";
import { getIsLoading, getError, getFavorites } from "./data/selectors";
import { connect } from "react-redux";
import { loadFavorites } from "./data/actions";
import ResultCard from "../SearchResults/ResultCard";
import { searchResultsStyles } from "../SearchResults/styles";

const styles = makeStyles((theme) => {
  return {
    root: {
      marginTop: `${theme.spacing() * 2}px`,
    },
  };
});

function Favorites({ loadFavorites, results }) {
  const [term, setTerm] = useState("");
  const classes = styles();
  const listClasses = searchResultsStyles();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <Grid justify="center" container item xs={12} className={classes.root}>
      <Grid container justify="center" item xs={12} sm={8} md={6} lg={4}>
        <Grid item xs={12}>
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
        <Grid container item xs={12}>
          <List className={listClasses.root}>
            {results.map((result) => {
              return <ResultCard key={result.id} {...result} />;
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getIsLoading(state),
    error: getError(state),
    results: getFavorites(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavorites: () => dispatch(loadFavorites()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
