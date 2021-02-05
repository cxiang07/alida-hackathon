import React, { useState, useParams } from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { PageHeading } from "../PageHeading";
import { useSelector, useDispatch } from "react-redux";
import { ShortAnswerList } from "../ShortAnswerList";

import Container from "@material-ui/core/Container";
import Chart from "react-apexcharts";

const splitPathname = window.location.pathname.split('/');
const selectedStoryId = splitPathname[splitPathname.length-1];

const heading = `Your story: ${2501814086107920771_45878728780}`;
const subheading = (
    <div>
        <p>Get insight on the responses your users are leaving on a specific story.</p>
    </div>
);
const body = (
    <div>
        <p>View all the collected user data.</p>
    </div>
);

const pageHeadingData = { heading, subheading, body };

const useStyles = makeStyles({
  chart: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function SelectedStory() {
    const classes = useStyles();
    const stories = useSelector((state) => state.stories[0].stories);
    console.log(stories);
    const selectedStory = stories.filter((story) => {
        return story.id === selectedStoryId;
    })[0];

    console.log(selectedStory);

    const questionTypesForStory = () => {
        let tags = [];
        if (selectedStory.story_poll_voter_infos) {
            tags.push("Poll Survery");
        }
        if (selectedStory.story_sliders) {
          tags.push("Slider Survery");
        }
        if (selectedStory.story_questions) {
          tags.push("Short Answer Survery");
        }
        if (selectedStory.story_quizs) {
          tags.push("Single Choice Survery");
        }
        return tags;
    };

    return (
        questionTypesForStory().map((questionType) => {
            if (questionType === "Poll Survery") {
                const options = {
                    chart: {
                          id: "basic-bar"
                    },
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                    }
                };
                const series = [
                    {
                        name: "series-1",
                        data: [30, 40, 45, 50, 49, 60, 70, 91]
                    }
                ];
            }

            <div>
                <div>
                    <PageHeading data={pageHeadingData} />
                </div>
                <Container>
                    <Chart
                        className={classes.chart}
                        options={options}
                        series={series}
                        type="bar"
                        width="1000"
                    />
                </Container>
            </div>
        })
        
    );
}
