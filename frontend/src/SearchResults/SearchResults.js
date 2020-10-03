import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import {
  getResults,
  getIsInProcess,
  getError,
} from "../SearchBlock/data/selectors";
import ResultCard from "./ResultCard";
import { Grid, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  loadMore,
  onLyricsLoadStart,
  onLyricsAddToFavorites,
} from "../SearchBlock/data/actions";
import { searchResultsStyles } from "./styles";

const SearchResults = (props) => {
  const classes = searchResultsStyles();
  const {
    error,
    results,
    loadMore,
    isInProcess,
    getLyrics,
    addToFavorite,
  } = props;

  //console.log(results);

  return (
    <Grid item xs={12}>
      <List className={classes.root}>
        {isInProcess && (
          <Backdrop className={classes.overlay} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {error && !isInProcess && (
          <Snackbar open={true}>
            <MuiAlert elevation={6} variant="filled" severity="error" />
          </Snackbar>
        )}
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <ResultCard
              {...result}
              getLyrics={getLyrics}
              addToFavorite={addToFavorite}
            />
            {/* <Divider variant="inset" component="li" /> */}
          </React.Fragment>
        ))}
      </List>
      {results.length > 0 && (
        <Grid justify="center" container item xs={12}>
          <Button
            className={classes.moreButton}
            variant="contained"
            color="primary"
            onClick={loadMore}
            disabled={isInProcess}
          >
            More
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  const results = getResults(state);
  const isInProcess = getIsInProcess(state);
  const error = getError(state);
  return {
    error,
    results,
    isInProcess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMore: () => dispatch(loadMore()),
    getLyrics: (songPath, songId) =>
      dispatch(onLyricsLoadStart(songPath, songId)),
    addToFavorite: (songId) => dispatch(onLyricsAddToFavorites(songId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
