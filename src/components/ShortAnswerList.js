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
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function toDateTime(secs) {
  let t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  const offsetMs = t.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(t.getTime() - offsetMs);
  return dateLocal.toLocaleString();
}

export const ShortAnswerList = (props) => {
  const classes = useStyles();
  const storyResponders =
    props.story.story_question_responder_infos[0].responders;
  const title = props.story.story_question_responder_infos[0].question;

  return (
    <Container>
      <Typography style={{ margin: "25px 0" }} variant="h4">
        Short Answer Question: "{title}"
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Response</StyledTableCell>
              <StyledTableCell align="center">Answered at</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storyResponders.map((oneRes) => (
              <StyledTableRow key={oneRes.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  <Avatar
                    src={oneRes.user.profile_pic_url}
                    style={{ marginLeft: "15px" }}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {oneRes.user.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {oneRes.response}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {toDateTime(oneRes.ts)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
