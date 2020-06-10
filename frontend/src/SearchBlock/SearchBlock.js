import React from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {
  getTerm,
  getIsInProcess,
  getError,
} from "./data/selectors";
import { updateTerm, searchStart } from "./data/actions";

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
    props.updateTerm(e.target.value);
    if (e.keyCode === 13) {
      props.searchStart();
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
          disabled={props.inProcess}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    term: getTerm(state),
    inProcess: getIsInProcess(state),
    error: getError(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerm: (term) => dispatch(updateTerm(term)),
    searchStart: () => dispatch(searchStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock);
