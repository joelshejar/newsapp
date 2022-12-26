import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import InfiniteScroll from "./Reusables/InfiniteScroll";
import "./styles/App.scss";
import { setNewsList, setNews } from "./Actions/newsAction";
import Weather from "./Weather/Weather";

const options = [
  { value: "hi", label: "Hindi" },
  { value: "ml", label: "Malayalam" },
  { value: "te", label: "Telugu" },
];

function App() {
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const dispatch = useDispatch();

  const newsList = useSelector((state) => state.news?.newsList ?? []);

  const getNews = async (func) => {
    setIsNewsLoading(true);
    try {
      let params = {
        token: process.env.REACT_APP_API_KEY,
        max: 6,
        sortby: "publishedAt",
      };

      params.q = query ? query : "business";
      params.lang = selectedOption ?? "ml";

      const url = process.env.REACT_APP_API_URL;
      const res = await axios.get(url, { params });
      if (res?.data && res.status === 200) {
        setIsNewsLoading(false);
        dispatch(func(res.data.articles));
      }
    } catch (err) {
      setIsNewsLoading(false);
      console.log(err);
    }
  };

  const newsWrapper = () => {
    return newsList.map((elm) => {
      return (
        <article className="news__wrapper--card">
          <div>
            <div className="news__wrapper--heading">{elm.title}</div>
            <img
              className="news__wrapper--image"
              src={elm.image}
              alt="news image"
            />
            <p className="news__wrapper--description">{elm.content}</p>
          </div>
        </article>
      );
    });
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    query && getNews(setNews);
  };

  const handleChange = (searchQuery) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    getNews(setNews);
  }, [selectedOption]);
  return (
    <>
      <header className="header">
        <h1 className="header__desc">
          Magazine and newspaper with news around the world
        </h1>
      </header>
      <Weather />
      <div className="form">
        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <textarea
            onChange={(e) => handleChange(e.target.value)}
            value={query}
            placeholder="Search"
            style={{ minWidth: "500px" }}
            type="text"
          />
          <br></br>
          <input
            className={`form__submit${isNewsLoading ? "--loading" : ""}`}
            type="submit"
            value={`${isNewsLoading ? "Loading.." : "Submit"}`}
          />
        </form>
        <div className="form__select">
          <label>
            Choose your language:
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="en">English</option>
              <option value="ml">Malayalam</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ja">Japanese</option>
              <option value="es">Spanish</option>
            </select>
          </label>
        </div>
      </div>

      <div className="news">
        <div className="news__wrapper">
          {newsList?.length > 0 ? newsWrapper() : <div>No Results found</div>}
        </div>
        <InfiniteScroll handlerFunc={() => getNews(setNewsList)} />
        {isNewsLoading && <span className="loading">Loading...</span>}
      </div>
    </>
  );
}

export default App;
