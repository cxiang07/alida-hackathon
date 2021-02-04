const { IgApiClient } = require("instagram-private-api");

const testAccount = "hackathon_test_feb";
const testPassword = "alidahackathon";

export const getPollResult = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(testAccount);
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(testAccount, testPassword);

  process.nextTick(async () => await ig.simulate.postLoginFlow());

  const userStories = ig.feed.userStory(loggedInUser.pk);
  const storeFeeds = await userStories.items();
  return Promise.resolve(storeFeeds);

  //   const pollStories = storeFeeds.filter(
  //     (storeFeed) =>
  //       (storeFeed.story_polls != null) | (storeFeed.story_polls != undefined)
  //   );
  //   const sliderStories = storeFeeds.filter(
  //     (storeFeed) =>
  //       (storeFeed.story_sliders != null) | (storeFeed.story_sliders != undefined)
  //   );

  //   const shortAnswerStories = storeFeeds.filter(
  //     (storeFeed) =>
  //       (storeFeed.story_questions != null) |
  //       (storeFeed.story_questions != undefined)
  //   );

  //   const choiceStories = storeFeeds.filter(
  //     (storeFeed) =>
  //       (storeFeed.story_quizs != null) | (storeFeed.story_quizs != undefined)
  //   );
};
