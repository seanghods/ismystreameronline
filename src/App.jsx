import Header from './components/Header';
import NavBar from './components/NavBar';
import AccountModal from './components/AccountModal';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Favorites from './containers/Favorites';
import AllGamesPage from './containers/AllGamesPage';
import { GamePage } from './containers/GamePage';
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
    activeDropdown,
    setShouldRenderContent,
  } = useStream();
  const [error, setError] = useState();
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
  useEffect(() => {
    if (!activeDropdown) {
      setShouldRenderContent(false);
    }
    setTimeout(() => {
      if (activeDropdown) {
        setShouldRenderContent(true);
      }
    }, 500);
  }, [activeDropdown, setShouldRenderContent]);
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
          error={error}
          setError={setError}
        />
      ) : null}
      <Header
        setShowModal={setShowModal}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />
      <div className="mt-10 flex w-full">
        <NavBar />
        <div className="flex flex-col w-full">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
