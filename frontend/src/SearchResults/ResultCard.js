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
import { IconButton, AccordionSummary } from "@material-ui/core";
import { resultCardStyles } from "./styles";
import { useState } from "react";

const ResultCard = (props) => {
  const classes = resultCardStyles();
  const {
    primary_artist: { image_url, name },
    full_title,
    favorite,
    loadingLyrics,
    path,
    lyrics,
  } = props;

  const [showLyrics, setShowLyrics] = useState(false);

  const getLyrics = () => {
    setShowLyrics(!showLyrics);
    !loadingLyrics && !showLyrics && !lyrics && props.getLyrics(path);
  };

  //console.log(showLyrics);

  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
      <div className={classes.dataBlock} onClick={getLyrics}>
        <ListItemAvatar>
          <Avatar className={classes.avatar} alt={full_title} src={image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={full_title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {name}
              </Typography>
            </React.Fragment>
          }
        />
      </div>
      <ListItemIcon>
        <IconButton>
          {!favorite ? (
            <StarBorder className={classes.favoriteIcon} />
          ) : (
            <Star className={classes.favoriteIconSelected} />
          )}
        </IconButton>
      </ListItemIcon>
      <Accordion expanded={showLyrics} onChange={getLyrics} className={classes.lyricsPanel}>
        <AccordionSummary
          className={classes.accordionSummary}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        ></AccordionSummary>
        <AccordionDetails className={classes.lyricsContent}>
          <Typography dangerouslySetInnerHTML={{__html: lyrics}}>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};

export default ResultCard;
