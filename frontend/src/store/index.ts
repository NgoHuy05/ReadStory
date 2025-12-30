import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import bookmarkReducer from './bookmarkSlice';
import categoryStoryReducer from './categoryStorySlice';
import commentReducer from './commentSlice';
import historyReducer from './historySlice';
import storyReducer from './storySlice';
import chapterReducer from './chapterSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    bookmark: bookmarkReducer,
    categoryStory: categoryStoryReducer,
    comment: commentReducer,
    history: historyReducer,
    story: storyReducer,
    category: categoryReducer,
    chapter: chapterReducer
  },
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
