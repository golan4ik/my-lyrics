import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import { getResults, getIsInProcess } from "../SearchBlock/data/selectors";
import ResultCard from "./ResultCard";
import { Divider, Grid, Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadMore, onLyricsLoadStart } from "../SearchBlock/data/actions";
import { searchResultsStyles } from "./styles";

const SearchResults = (props) => {
  const classes = searchResultsStyles();
  const { results, loadMore, isInProcess, getLyrics } = props;

  //console.log(results);

  return (
    <Grid justify="center" container item xs={12}>
      <List className={classes.root}>
        {isInProcess && (
          <Backdrop className={classes.overlay} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <ResultCard {...result} getLyrics={getLyrics} />
            <Divider variant="inset" component="li" />
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
  return {
    results,
    isInProcess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMore: () => dispatch(loadMore()),
    getLyrics: (songPath) => dispatch(onLyricsLoadStart(songPath))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
