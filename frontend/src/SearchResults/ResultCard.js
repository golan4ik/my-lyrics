import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  avatar: {
    borderRadius: 0,
  },
}));

const ResultCard = (props) => {
  const classes = useStyles();
  const {
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
    </ListItem>
  );
};

export default ResultCard;
