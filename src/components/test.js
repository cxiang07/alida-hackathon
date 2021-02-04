const { IgApiClient } = require("instagram-private-api");
const { sample } = require("lodash");
const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time

const testAccount = "hackathon_test_feb";
const testPassword = "alidahackathon";
ig.state.generateDevice(testAccount);

(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(testAccount, testPassword);
  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  //   // Create UserFeed instance to get loggedInUser's posts
  //   const userFeed = ig.feed.user(loggedInUser.pk);
  //   const myPostsFirstPage = await userFeed.items();

  // Get user's story
  const storyFeed = ig.feed.userStory(loggedInUser.pk);
  const myStoryFeed = await storyFeed.items();
  console.log(myStoryFeed);
  console.log(myStoryFeed[1].story_sliders);

  const storyId = myStoryFeed[1].id;
  const sliderId = myStoryFeed[1].story_sliders[0].slider_sticker.slider_id;

  const sliderFeed = ig.feed.storySliderVoters(storyId, sliderId);
  const sliderResult = await sliderFeed.items();
  console.log(sliderResult);
})();
