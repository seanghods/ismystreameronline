import { Header, NavBar, AccountModal } from './components';
import {
  Home,
  AllGamesPage,
  Favorites,
  GamePage,
  NotFound,
  RequestPage,
  SearchPage,
  About,
} from './containers';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import useStream from './Context/useStream';
import { API_ROUTES } from './utils/constants';
import { removeUndefinedValues } from './utils/helpers';
function App() {
  const {
    streamerData,
    setStreamerData,
    setGames,
    loggedIn,
    setLoggedIn,
    setFavorites,
    setLoading,
    setFavoritesData,
    setHasMore,
  } = useStream();
  const [lightMode, setLightMode] = useState(true);
  const [showModal, setShowModal] = useState('');
  useEffect(() => {
    fetchGames();
  }, [streamerData, setGames]);
  useEffect(() => {
    async function checkAuthenticationStatus() {
      try {
        const response = await fetch(API_ROUTES.checkSession, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
    }
    checkAuthenticationStatus();
  }, [setLoggedIn]);
  useEffect(() => {
    async function getFavorites() {
      if (loggedIn) {
        const response = await fetch(API_ROUTES.favorites, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();
        setFavorites(data);
      }
    }
    getFavorites();
  }, [loggedIn, setFavorites]);
  useEffect(() => {
    async function getFavoritesData() {
      if (loggedIn) {
        const response = await fetch(API_ROUTES.favoritesData, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();
        setFavoritesData(data);
      }
    }
    getFavoritesData();
  }, [loggedIn]);
  const fetchStreamers = useCallback(
    async (status, gameSlug, platform) => {
      if (!platform) setLoading(true);
      const url = API_ROUTES.streamers;
      const rawParams = removeUndefinedValues({
        status,
        gameSlug,
        platform,
      });
      const params = new URLSearchParams(rawParams);

      const response = await fetch(`${url}?${params}`, {
        credentials: 'include',
        withCredentials: true,
      });
      if (!response.ok) console.log('error');
      const data = await response.json();
      const { streamers, hasMore } = data;
      setStreamerData(streamers);
      setHasMore(hasMore);
      if (!platform) setLoading(false);
    },
    [setLoading, setStreamerData],
  );
  const fetchMoreStreamers = useCallback(
    async (status, gameSlug, streamerData, platform) => {
      const url = API_ROUTES.streamers;
      const rawParams = removeUndefinedValues({
        offset: streamerData.length,
        status,
        gameSlug,
        platform,
      });
      const params = new URLSearchParams(rawParams);
      const response = await fetch(`${url}?${params}`, {
        credentials: 'include',
        withCredentials: true,
      });
      if (!response.ok) console.log('error');
      const data = await response.json();
      const { streamers, hasMore } = data;
      setStreamerData(streamers);
      setHasMore(hasMore);
      setStreamerData(prevStreamers => [...prevStreamers, ...streamers]);
    },
    [setStreamerData],
  );
  async function fetchGames() {
    const response = await fetch(API_ROUTES.games, {
      credentials: 'include',
      withCredentials: true,
    });
    if (!response.ok) console.log('error');
    const gamesList = await response.json();
    setGames(gamesList);
  }
  async function fetchMoreGames(gamesData) {
    const response = await fetch(
      `${API_ROUTES.games}?offset=${gamesData.length}`,
      {
        credentials: 'include',
        withCredentials: true,
      },
    );
    if (!response.ok) console.log('error');
    const moreGames = await response.json();
    setGames(prevGames => [...prevGames, ...moreGames]);
  }
  return (
    <>
      {showModal ? (
        <AccountModal
          showModal={showModal}
          setShowModal={setShowModal}
          setLoggedIn={setLoggedIn}
        />
      ) : null}
      <Header
        setShowModal={setShowModal}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />
      <div className="mt-10 flex">
        <NavBar />
        <div className="flex flex-col w-full lg:w-4/5">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  fetchStreamers={fetchStreamers}
                  fetchMoreStreamers={fetchMoreStreamers}
                />
              }
            />
            <Route
              path="/game/:name"
              element={
                <GamePage
                  fetchStreamers={fetchStreamers}
                  fetchMoreStreamers={fetchMoreStreamers}
                />
              }
            />
            <Route
              path="/all-games"
              element={<AllGamesPage fetchMoreGames={fetchMoreGames} />}
            />
            <Route
              path="/favorites"
              element={<Favorites fetchMoreStreamers={fetchMoreStreamers} />}
            />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
