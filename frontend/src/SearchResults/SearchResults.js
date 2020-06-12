import React from "react";
import { connect } from "react-redux";
import { getResults } from "../SearchBlock/data/selectors";

const SearchResults = (props) => {
  const { results } = props;

  return (
    <>
      {results.map((result) => (
        <div key={result.id}>{result.full_title}</div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const results = getResults(state);
  return {
    results,
  };
};

export default connect(mapStateToProps)(SearchResults);
