import userRouter from './user.route.js';
import storyRouter from './story.route.js';
import chapterRouter from './chapter.route.js';
import historyRouter from './history.route.js';
import bookmarkRouter from './bookmark.route.js';
import commentRouter from './comment.route.js';
import categoryRouter from './category.route.js';
import storyCategoryRouter from './storyCategory.route.js';
import authRouter from './auth.route.js';

export default (app) => {
    app.use('/auths', authRouter);
    app.use('/users', userRouter);
    app.use('/stories', storyRouter);
    app.use('/story-categories', storyCategoryRouter);
    app.use('/chapters', chapterRouter);
    app.use('/histories', historyRouter);
    app.use('/bookmarks', bookmarkRouter);
    app.use('/comments', commentRouter);
    app.use('/categories', categoryRouter);
};
