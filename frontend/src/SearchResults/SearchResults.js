import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { getResults, getIsInProcess } from "../SearchBlock/data/selectors";
import ResultCard from "./ResultCard";
import { Divider, Grid, Button } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { loadMore } from "../SearchBlock/data/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    maxHeight: "400px",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(100,100,100,0.2)",
    zIndex: 100,
  },
}));

const SearchResults = (props) => {
  const { results, loadMore, isInProcess } = props;
  const classes = useStyles();

  console.log(results);

  return (
    <Grid justify="center" container item xs={12}>
      <List className={classes.root}>
        {isInProcess && results.length > 0 && (
          <div className={classes.overlay}></div>
        )}
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <ResultCard {...result} />
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {results.length > 0 && (
        <Grid justify="center" container item xs={12}>
          <Button
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
