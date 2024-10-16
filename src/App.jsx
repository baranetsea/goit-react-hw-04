import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { ImageGallery } from "./components/imagegallery/ImageGallery";
import SearchBar from "./components/searchbar/SearchBar";

import axios from "axios";
import ImageModal from "./components/imagemodal/ImageModal";
import Loader from "./components/loader/Loader";
import ErrorMessage from "./components/errormessage/ErrorMessage";
import LoadMoreBtn from "./components/loadmorebtn/LoadMoreBtn";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [userQuery, setUserQuery] = useState("");
  const [modalData, setModalData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);

  axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
  const ACCESS_KEY = "ILldUFOrVQDgE6LCK03o7IyQT7cUyDMAycUCjkMm30c";

  const fetchPhotos = async (userQuery, currentPage) => {
    const axiosOptions = {
      params: {
        client_id: ACCESS_KEY,
        query: userQuery,
        page: currentPage,
        per_page: 12,
      },
    };

    try {
      return await axios.get("/", axiosOptions);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!userQuery) {
      return;
    }

    (async () => {
      setIsLoading(true);
      const response = await fetchPhotos(userQuery, page);

      if (response.status >= 400 || response.data.results.length === 0) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setTotalPage(response.data.total_pages);

      setIsLoading(false);
      setIsError(false);

      setImage((prevImages) => {
        return [...prevImages, ...response.data.results];
      });
    })();
  }, [userQuery, page]);

  useEffect(() => {
    if (isLoading === false && page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [image, isLoading, page]);

  const onHandleSubmit = (query) => {
    setImage([]);

    setPage(1);
    setUserQuery(query);
  };

  const onOpenModal = (data) => {
    setModalIsOpen(true);
    setModalData(data);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
    setModalData(null);
  };

  const onLoadMoreHandle = () => {
    setIsLoading(true);
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <SearchBar onHandleSubmit={onHandleSubmit} />
      <ImageGallery data={image} onImageOpen={onOpenModal} />
      {modalData && <ImageModal modalData={modalData} onImageClose={onCloseModal} isOpen={modalIsOpen} />}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {image.length !== 0 && page < totalPage && <LoadMoreBtn onLoadMore={onLoadMoreHandle} />}
    </>
  );
}

export default App;
