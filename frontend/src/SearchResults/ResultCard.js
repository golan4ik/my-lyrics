import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from '@material-ui/icons/Star';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { resultCardStyles } from "./styles";

const ResultCard = (props) => {
  const classes = resultCardStyles();
  const {
    showStars,
    primary_artist: { image_url, name },
    full_title,
  } = props;

  //console.log(props);

  return (
    <ListItem alignItems="flex-start">
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
      {showStars && <ListItemIcon>
        <IconButton>
          <StarBorder className={classes.favoriteIcon} />
          <Star className={classes.favoriteIconSelected} />
        </IconButton>
      </ListItemIcon>}
    </ListItem>
  );
};

export default ResultCard;
