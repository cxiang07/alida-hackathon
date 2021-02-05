import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PageHeading } from "../PageHeading";
import { useLocation } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ShortAnswerList } from "../ShortAnswerList";

const useStyles = makeStyles({
  chart: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function SelectedStory() {
  const location = useLocation();
  const storyId = location.pathname.toString().substring(9);
  const story = useSelector((state) => state.stories).filter(
    (story) => story.id === storyId
  )[0];
  const heading = `Your story: ${storyId}`;
  const subheading = (
    <div>
      <p>
        Get insight on the responses your users are leaving on a specific story.
      </p>
    </div>
  );
  const body = (
    <div>
      <p>View all the collected user data.</p>
    </div>
  );

  const pageHeadingData = { heading, subheading, body };
  const classes = useStyles();
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <div>
      <div>
        <PageHeading data={pageHeadingData} />
      </div>
      <Container>
        {story.story_questions ? (
          <ShortAnswerList story={story} />
        ) : (
          <Chart
            className={classes.chart}
            options={options}
            series={series}
            type="bar"
            width="1000"
          />
        )}
      </Container>
    </div>
  );
}
