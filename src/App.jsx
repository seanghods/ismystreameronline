import { Header, NavBar, AccountModal } from './components';
import {
  Home,
  AllGamesPage,
  Favorites,
  GamePage,
  NotFound,
  RequestPage,
} from './containers';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import useStream from './Context/useStream';

function App() {
  const {
    streamerData,
    setStreamerData,
    setGames,
    loggedIn,
    setLoggedIn,
    setFavorites,
    setLoading,
  } = useStream();
  const [lightMode, setLightMode] = useState(true);
  const [showModal, setShowModal] = useState('');
  useEffect(() => {
    fetchGames();
  }, [streamerData, setGames]);
  useEffect(() => {
    async function checkAuthenticationStatus() {
      try {
        const response = await fetch('/api/check-session');
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
        const response = await fetch('/api/favorites');
        const data = await response.json();
        setFavorites(data);
      }
    }
    getFavorites();
  }, [loggedIn, setFavorites]);
  const fetchStreamers = useCallback(
    async (status, gameSlug, favorites) => {
      setLoading(true);
      let url = '/api/streamers';
      const query = [];

      if (status) {
        query.push(`status=${status}`);
      }
      if (gameSlug) {
        query.push(`game=${gameSlug}`);
      }
      if (favorites) {
        query.push(`favorites=${favorites}`);
      }
      if (query.length > 0) {
        url += `?${query.join('&')}`;
      }
      const response = await fetch(url);
      if (!response.ok) console.log('error');
      const streamersList = await response.json();
      setStreamerData(streamersList);
      setLoading(false);
    },
    [setLoading, setStreamerData],
  );
  const fetchMoreStreamers = useCallback(
    async (status, gameSlug, favorites, streamerData) => {
      let url = '/api/streamers';
      const query = [`offset=${streamerData.length}`];

      if (status) {
        query.push(`status=${status}`);
      }
      if (gameSlug) {
        query.push(`game=${gameSlug}`);
      }
      if (favorites) {
        query.push(`favorites=${favorites}`);
      }
      if (query.length > 0) {
        url += `?${query.join('&')}`;
      }
      const response = await fetch(url);
      if (!response.ok) console.log('error');
      const moreStreamers = await response.json();
      setStreamerData(prevStreamers => [...prevStreamers, ...moreStreamers]);
    },
    [setStreamerData],
  );
  async function fetchGames() {
    const response = await fetch('/api/games');
    if (!response.ok) console.log('error');
    const gamesList = await response.json();
    setGames(gamesList);
  }
  async function fetchMoreGames(gamesData) {
    const response = await fetch(`/api/games?offset=${gamesData.length}`);
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
        <div className="flex flex-col w-full lg:w-2/3">
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
              element={
                <Favorites
                  fetchStreamers={fetchStreamers}
                  fetchMoreStreamers={fetchMoreStreamers}
                />
              }
            />
            <Route path="/request" element={<RequestPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
