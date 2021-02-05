import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100vh",
  },
}));

export function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{ width: "80px", height: "80x" }} />
      <br />
      <h3>Loading your stories...</h3>
    </div>
  );
}
