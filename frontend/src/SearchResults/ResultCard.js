import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {
  IconButton,
  AccordionSummary,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { resultCardStyles } from "./styles";
import { useState } from "react";

const ResultCard = (props) => {
  const classes = resultCardStyles();
  const {
    header_image_thumbnail_url,
    disabled,
    full_title,
    favorite,
    loadingLyrics,
    path,
    id,
    lyrics,
    addToFavorite,
  } = props;

  const [showLyrics, setShowLyrics] = useState(false);

  const getLyrics = () => {
    if (disabled) return;
    setShowLyrics(!showLyrics);
    !loadingLyrics && !showLyrics && !lyrics && props.getLyrics(path, id);
  };

  return (
    <ListItem
      alignItems="flex-start"
      className={`${classes.listItem} ${favorite ? 'favorite': ''}`}
      disabled={!!disabled}
    >
      <div className={classes.dataBlock} onClick={getLyrics}>
        <ListItemAvatar>
          <Avatar
            className={classes.avatar}
            alt={full_title}
            src={header_image_thumbnail_url}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="body1" color="textPrimary">
              {full_title}
            </Typography>
          }
        />
      </div>
      <ListItemIcon className={classes.favoriteButton}>
        <IconButton onClick={() => !disabled && addToFavorite(id)}>
          {!favorite ? (
            <StarBorder className={classes.favoriteIcon} />
          ) : (
            <Star className={classes.favoriteIconSelected} />
          )}
        </IconButton>
      </ListItemIcon>
      <Accordion
        expanded={showLyrics}
        onChange={getLyrics}
        className={classes.lyricsPanel}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        ></AccordionSummary>
        <AccordionDetails className={classes.lyricsContent}>
          <Typography dangerouslySetInnerHTML={{ __html: lyrics }}></Typography>
          {loadingLyrics && (
            <Backdrop open={true} className={classes.backDrop}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};

export default ResultCard;
