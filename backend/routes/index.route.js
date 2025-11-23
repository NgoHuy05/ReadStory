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
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/story', storyRouter);
    app.use('/storyCategory', storyCategoryRouter);
    app.use('/chapter', chapterRouter);
    app.use('/history', historyRouter);
    app.use('/bookmark', bookmarkRouter);
    app.use('/comment', commentRouter);
    app.use('/category', categoryRouter);
};
