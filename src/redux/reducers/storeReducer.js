const INITIAL_STATE = [
  {
    id: 123,
    date: "2020-02-04",
    storyName: "this is a test",
    pollFeeds: [],
    sliderFeeds: [],
    shortAnswerFeeds: [],
    quizFeeds: [],
  },
];

export const storyReducer = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_STORIES") {
    return action.stories;
  } else return state.slice();
};
