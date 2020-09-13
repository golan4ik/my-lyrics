import { makeStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { findByLabelText } from "@testing-library/react";

export const searchResultsStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    /* maxWidth: "36ch", */
    minHeight: `calc(70vh - ${theme.spacing(3)}px)`,
    maxHeight: `calc(70vh - ${theme.spacing(3)}px)`,
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
    color: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.drawer + 1,
  },
  moreButton: {
    marginTop: theme.spacing(3),
  },
}));

export const resultCardStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  listItem: {
    flexWrap: "wrap",
    cursor: 'default',
    '&.Mui-disabled': {
      cursor: 'wait'
    }
  },
  lyricsPanel: {
    flexBasis: "100%",
  },
  lyricsContent: {
    position: 'relative',
    minHeight: '20vh',
    maxHeight: '40vh',
    overflow: 'hidden',
    overflowY: 'auto',
    '& a': {
      all: 'unset'
    }
  },
  backDrop: {
    position: 'absolute',
    zIndex: 1
  },
  accordionSummary: {
    height: 0,
    minHeight: "0!important",
    padding: 0,
  },
  dataBlock: {
    display: "flex",
    boxSizing: "border-box",
    flex: 1,
  },
  avatar: {
    borderRadius: 0,
  },
  favoriteIcon: {
    color: orange[500],
    fontSize: theme.typography.fontSize * 2 + "px",
  },
  favoriteIconSelected: {
    color: orange[500],
    fontSize: theme.typography.fontSize * 2 + "px",
  },
}));
