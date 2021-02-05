import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { PageHeading } from "../PageHeading";
import { useSelector } from "react-redux";
import { ShortAnswerList } from "../ShortAnswerList";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Chart from "react-apexcharts";

const heading = `Your story`;
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
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SelectedStory() {
    const classes = useStyles();
    const stories = useSelector((state) => state.stories);
    const splitPathname = window.location.pathname.split('/');
    const selectedStoryId = splitPathname[splitPathname.length-1];
    const selectedStory = stories.filter((story) => {
        return story.id === selectedStoryId;
    })[0];

    console.log(selectedStory);

    const questionTypesForStory = () => {
        let tags = [];
        if (selectedStory.story_poll_voter_infos) {
            tags.push("Poll Survey");
        }
        if (selectedStory.story_sliders) {
          tags.push("Slider Survey");
        }
        if (selectedStory.story_questions) {
          tags.push("Short Answer Survey");
        }
        if (selectedStory.story_quizs) {
          tags.push("Single Choice Survey");
        }
        return tags;
    };

    return (
        questionTypesForStory().map((questionType, key) => {
            let options = {};
            let series = [];

            // 2501814086107920771_45878728780
            if (questionType === "Poll Survey") {
                let pollAnswers = [0, 1];
                const voters = selectedStory.story_poll_voter_infos[0].voters;
                let pollCount1 = 0;
                let pollCount2 = 0;

                voters.forEach((voterResponse) => {
                    voterResponse.vote === pollAnswers[0] ? pollCount1++ : pollCount2++;
                });

                options = {
                    chart: {
                          id: "basic-bar"
                    },
                    xaxis: {
                        categories: [pollAnswers[0], pollAnswers[1]]
                    }
                };
                series = [
                    {
                        name: "series-1",
                        data: [pollCount1, pollCount2]
                    }
                ];

                return (
                    <div key={key}>
                        <div>
                            <PageHeading data={pageHeadingData} />
                        </div>
                        <Container>
                        <Typography style={{ margin: "25px 0" }} variant="h4">
                            Poll Question
                        </Typography>
                            <Chart
                                className={classes.chart}
                                options={options}
                                series={series}
                                type="bar"
                                width="1000"
                            />
                        </Container>
                    </div> 
                )
                // 2501814782932786361_45878728780
            } else if (questionType === "Slider Survey" ) {
                const averageScore = selectedStory.story_sliders[0].slider_sticker.slider_vote_average;
                
                return (
                    <div key={key}>
                        <div>
                            <PageHeading data={pageHeadingData} />
                        </div>
                        <Container>
                            <Typography style={{ margin: "25px 0" }} variant="h4">
                                Slider Question: "{selectedStory.story_sliders[0].slider_sticker.question}"
                            </Typography>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Average Slider Responses
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {Math.ceil(averageScore * 100)}%
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Voter Count: {selectedStory.story_slider_voter_infos[0].voters.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Container>
                    </div> 
                );
                // 2501815550482044397_45878728780
            } else if (questionType === "Short Answer Survey" ) {
                return (
                    <div key={key}>
                        <div>
                            <PageHeading data={pageHeadingData} />
                        </div>
                        <Container>
                            <ShortAnswerList story={selectedStory} key={key}/>
                        </Container>
                    </div> 
                );
                // 2501818591419402021_45878728780
            } else if (questionType === "Single Choice Survey" ) {
                const questionOptions = selectedStory.story_quizs[0].quiz_sticker.tallies;

                let questionsText = [];
                let questionsCount = [];

                questionOptions.forEach((question) => {
                    questionsText.push(question.text);
                    questionsCount.push(question.count);
                });

                options = {
                    chart: {
                          id: "basic-bar"
                    },
                    xaxis: {
                        categories: questionsText
                    }
                };
                series = [
                    {
                        name: "series-1",
                        data: questionsCount
                    }
                ];
            } 

            return (
                <div key={key}>
                    <div>
                        <PageHeading data={pageHeadingData} />
                    </div>
                    <Container>
                    <Typography style={{ margin: "25px 0" }} variant="h4">
                        Single Choice Question: "{selectedStory.story_quizs[0].quiz_sticker.question}"
                    </Typography>
                        <Chart
                            className={classes.chart}
                            options={options}
                            series={series}
                            type="bar"
                            width="1000"
                        />
                    </Container>
                </div>
            );
        })
        
    );
}
