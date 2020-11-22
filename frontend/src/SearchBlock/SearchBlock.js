import React from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { getTerm, getIsInProcess, getError } from "./data/selectors";
import { updateTerm, searchStart } from "./data/actions";

const styles = makeStyles((theme) => {
  return {
    root: {
      marginTop: `${theme.spacing() * 2}px`,
    },
    searchField: {
      flex: 1,
    },
  };
});

const SearchBlock = (props) => {
  const { term, inProcess, onSearchStart, updateTerm } = props;
  const classes = styles();

  const onChange = (e) => {
    updateTerm(e.target.value);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSearchStart();
    }
  };

  return (
    <Grid container item xs={12}>
      <Grid className={classes.root} container item justify="center" xs={12}>
        <TextField
          autoFocus
          className={classes.searchField}
          label="Search"
          placeholder="Type song or artist name"
          variant="outlined"
          size="small"
          onKeyUp={onKeyUp}
          onChange={onChange}
          value={term}
          focus="true"
          disabled={inProcess}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    term: getTerm(state),
    inProcess: getIsInProcess(state),
    error: getError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerm: (term) => dispatch(updateTerm(term)),
    onSearchStart: () => dispatch(searchStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock);
