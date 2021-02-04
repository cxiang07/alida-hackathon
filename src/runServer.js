const http = require("http")
const Koa = require('koa');
const Router = require('koa-router');
const { IgApiClient } = require("instagram-private-api");

const PORT = 3444;

async function auth(ctx, next) {
    const { authorization } = ctx.request.header;
    const token = authorization.split(' ')[1];
    // Commented out as we won't be using any form of encoding for now
    // const buff = Buffer.from(token2, 'base64');
    // const token = buff.toString('ascii');
    // console.log(`token: ${data}`)

    ctx.state = {};
    ctx.state.username = token.split(":")[0];
    ctx.state.password = token.split(":")[1];
    // console.log(`user: ${ctx.state.username} pass: ${ctx.state.password}`);
    await next();
}

async function run() {
    // Setup Koajs
    const app = new Koa();
    app.proxy = true;

    // Setup middleware
    app.use(auth);

    // Setup api routes
    let router = new Router({ prefix: '/v1' });
    router.get('/stories', async (ctx) => {
        console.log("in the endpoint");
        const username = ctx.state.username;
        const password = ctx.state.password;
        console.log(`${username} ${password}`);

        try {
            // Setup IG link
            const ig = new IgApiClient();
            ig.state.generateDevice(username);
            const loggedInUser = await ig.account.login(username, password);
            process.nextTick(async () => await ig.simulate.postLoginFlow());
            console.log("IG has been linked");

            // Grab stories
            const storyFeed = ig.feed.userStory(loggedInUser.pk);
            const myStoryFeed = await storyFeed.items();

            const storyMap = myStoryFeed.map((story) => {
                // Splice object for relevant info
                const { pk, id, expiring_at, media_type, taken_at, viewers, viewer_count, total_viewer_count } = story;
                let res = { pk, id, expiring_at, media_type, taken_at, viewers, viewer_count, total_viewer_count };
                if (story.story_sliders) {
                    res.story_sliders = story.story_sliders;
                    res.story_slider_voter_infos = story.story_slider_voter_infos;
                    res.story_static_models = story.story_static_models;
                } else if (story.story_questions) {
                    res.story_questions = story.story_questions;
                    res.story_question_responder_infos = story.story_question_responder_infos;
                } else if (story.story_quizs) {
                    res.story_quizs = story.story_quizs;
                    res.story_quiz_participant_infos = story.story_quiz_participant_infos;
                    res.story_static_models = story.story_static_models;
                } else if (story.story_polls) {
                    res.story_polls = story.storyPolls;
                    res.story_poll_voter_infos = story.story_poll_voter_infos;
                }
                return res;
            })

            // console.log(myStoryFeed[1].story_sliders);
            console.log(storyMap);
            ctx.status = 200;
            ctx.body = storyMap;
        } catch (e) {
            ctx.status = 401;
            ctx.body = { message: `Something went wrong! ${e}`, status: 401 }
        }
    });
    router.get('/stories/:storyId', async (ctx) => {
        const { storyId } = ctx.params
        // TODO (if we need to)
    });
    app.use(router.allowedMethods());
    app.use(router.routes());

    // Setup the actual server
    const server = http.createServer(app.callback()).listen(PORT, () => {
        console.log(`App successfully launched on port: ${PORT}`)
    })

    process.on('SIGINT', () => {
        server.close(() => {
            console.log('server shutting down...');
            process.exit(0);
        })
    })
};

run();