import { SET_NEWS_LIST, SET_NEWS } from "./type";

export const setNewsList = (newsList) => {
  return {
    type: SET_NEWS_LIST,
    payload: { newsList },
  };
};

export const setNews = (news) => {
  return {
    type: SET_NEWS,
    payload: { news },
  };
};
