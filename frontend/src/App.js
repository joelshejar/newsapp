import { useEffect, useState } from "react";
import axios from "axios";

import InfiniteScroll from "./Reusables/InfiniteScroll";
import "./styles/App.scss";

function App() {
  const [newsList, setNewsList] = useState([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const getNews = async () => {
    setIsNewsLoading(true);
    try {
      let params = {
        q: "example",
        token: process.env.REACT_APP_API_KEY,
        max: 6,
      };

      const url = process.env.REACT_APP_API_URL;
      const res = await axios.get(url, { params });
      if (res?.data && res.status === 200) {
        setIsNewsLoading(false);
        console.log(res);
        setNewsList([...newsList, ...res.data.articles]);
      }
    } catch (err) {
      setIsNewsLoading(false);
      console.log(err);
    }
  };

  const newsWrapper = () => {
    return newsList.map((elm) => {
      return (
        <article>
          <div>
            <div className="news1">{elm.title}</div>
            <img className="image1" src={elm.image} />
            <p className="news--description">{elm.content}</p>
          </div>
        </article>
      );
    });
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <header className="header">
        <p className="header--para">
          Magazine and newspaper with news around the world
        </p>
      </header>
      <div className="page">
        <div className="layout">{newsList?.length > 0 && newsWrapper()}</div>
        <InfiniteScroll handlerFunc={getNews} />
        {isNewsLoading && <span>Loading...</span>}
      </div>
    </>
  );
}

export default App;
