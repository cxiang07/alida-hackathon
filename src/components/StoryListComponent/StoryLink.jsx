import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  storyLink: {
    "& .MuiButton-root:hover": {
      backgroundColor: 0,
    },
  },
});

export const StoryLink = (props) => {
  const { to, children } = props;
  const classes = useStyles();

  const history = useHistory();

  const onNavigate = (event) => {
    event.stopPropagation();
    history.push(to);
  };

  return (
    <Button className={classes.storyLink} {...props} onClick={onNavigate}>
      {children}
    </Button>
  );
};

export default StoryLink;
