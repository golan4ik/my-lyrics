import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { getResults } from "../SearchBlock/data/selectors";
import ResultCard from "./ResultCard";
import { Divider, Grid, Button } from "@material-ui/core";
import { loadMore } from "../SearchBlock/data/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    maxHeight: '400px',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchResults = (props) => {
  const { results, loadMore } = props;
  const classes = useStyles();

  console.log(results);

  return (
    <Grid justify="center" container item xs={12}>
      <List className={classes.root}>
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <ResultCard {...result} />
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Grid justify="center" container item xs={12}>
        <Button variant="contained" color="primary" onClick={loadMore}>
          More
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const results = getResults(state);
  return {
    results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMore: () => dispatch(loadMore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
