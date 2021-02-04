import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { TagsCell } from "../components/tagsCell";
import { PageHeading } from "../components/PageHeading";

const heading = "Your story";
const subheading = (
  <div>
    <p>Check all your active stories on Instagram here.</p>
  </div>
);
const body = (
  <div>
    <p>You can click on a Story to see the statics of your story feed.</p>
  </div>
);

const pageHeadingData = { heading, subheading, body };

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = [
  {
    storyId: 123,
    date: "2020-02-02",
    viewCount: 100,
    tags: ["Poll", "Slider"],
  },
  {
    storyId: 234,
    date: "2020-02-02",
    viewCount: 100,
    tags: ["Quiz"],
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const StoryListPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <PageHeading data={pageHeadingData} />
      </div>
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Story ID</StyledTableCell>
                <StyledTableCell align="center">
                  Story publish Date
                </StyledTableCell>
                <StyledTableCell align="center">Viewer Count</StyledTableCell>
                <StyledTableCell align="center">Tags</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.storyId}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.storyId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.viewCount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TagsCell tags={row.tags}></TagsCell>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
