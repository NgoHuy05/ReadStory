const userRouter = require('./user.route');
const storyRouter = require('./story.route');
const storyCategoryRouter = require('./storyCategory.route');
const historyRouter = require('./history.route');
const bookmarkRouter = require('./bookmark.route');
const commentRouter = require('./comment.route');
const categoryRouter = require('./category.route');
const storyCategoryRouter = require('./storyCategory.route');
const chapterRouter = require('./chapter.route');
module.exports = (app) => {
    app.use('/users', userRouter);
    app.use('/stories', storyRouter);
    app.use('/story-categories', storyCategoryRouter);
    app.use('/chapters', chapterRouter);
    app.use('/histories', historyRouter);
    app.use('/bookmarks', bookmarkRouter);
    app.use('/comments', commentRouter);
    app.use('/categories', categoryRouter);
    app.use('/story-categories', storyCategoryRouter);

}