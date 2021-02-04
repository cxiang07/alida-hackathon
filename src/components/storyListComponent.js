import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Toolbar, Grid, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  container: {
    maxWidth: theme.breakpoints.values.sm,
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.breakpoints.values.md,
    },
  },
}));

export const StoryList = () => {
  const stories = useSelector((state) => state.stories);
  const dispatch = useDispatch();
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "Story ID", width: 250 },
    { field: "storyName", headerName: "Story Name", width: 250 },
    { field: "date", headerName: "Publish Date", width: 250, type: "date" },
    { field: "viewerCount", headerName: "Viewer Count", width: 200 },
    {
      field: "tags",
      headerName: "Tags",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      rootRef={},
      width: 250,
    },
  ];

  const rows = [{ id: 123, storyName: "Test", date: "2021-02-02", tags: 123 }];

  return (
    <Container>
      <Toolbar>
        <Grid container justify="center">
          <Typography variant="h6">Your Stories</Typography>
        </Grid>
      </Toolbar>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </Container>
  );
};
