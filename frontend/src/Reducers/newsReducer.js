import { SET_NEWS_LIST, SET_NEWS } from "../Actions/type";

const initialState = {
  newsList: [],
};

export const newsReducer = (state = initialState, { type, payload }) => {
  const { newsList } = state;
  switch (type) {
    case SET_NEWS_LIST:
      return {
        newsList: [...newsList, ...payload?.newsList],
      };

    case SET_NEWS:
      return {
        newsList: payload.news,
      };

    default:
      return state;
  }
};
