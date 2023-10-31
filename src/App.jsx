import Header from './components/Header';
import NavBar from './components/NavBar';
import AccountModal from './components/AccountModal2';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Favorites from './containers/Favorites';
import { GamePage } from './containers/GamePage';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [streamerData, setStreamerData] = useState([]);
  const [gamesData, setGames] = useState([]);
  const [showModal, setShowModal] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchGames() {
      const response = await fetch('/api/games');
      if (!response.ok) console.log('error');
      const gamesList = await response.json();
      const enrichedGames = gamesList.map(game => {
        const totalViewers = getViewersForGame(streamerData, game.name);
        const totalStreamers = getStreamersForGame(streamerData, game.name);
        return { ...game, totalViewers, totalStreamers };
      });
      setGames(enrichedGames);
    }
    fetchGames();
  }, [streamerData]);
  useEffect(() => {
    checkAuthenticationStatus();
  }, []);
  useEffect(() => {
    async function getFavorites() {
      if (loggedIn) {
        const response = await fetch('/api/favorites');
        const data = await response.json();
        setFavorites(data);
      }
    }
    getFavorites();
  }, [loggedIn]);
  async function fetchStreamers(status, gameSlug, favorites) {
    setLoading(true);
    console.log('loading on');
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
    console.log(streamersList);
    await sleep(200);
    setLoading(false);
    console.log('loading off');
  }
  async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
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
  function getViewersForGame(streamerData, gameName) {
    return streamerData
      .filter(streamer => streamer.game && streamer.game.name == gameName)
      .reduce((total, streamer) => total + streamer.viewers, 0);
  }
  function getStreamersForGame(streamerData, gameName) {
    return streamerData.filter(
      streamer => streamer.game && streamer.game.name == gameName,
    ).length;
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
      <NavBar gamesData={gamesData} />
      <div className="flex-col w-full">
        <Header
          setShowModal={setShowModal}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                streamerData={streamerData}
                loggedIn={loggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                fetchStreamers={fetchStreamers}
                loading={loading}
              />
            }
          />
          <Route
            path="/game/:name"
            element={
              <GamePage
                streamerData={streamerData}
                gamesData={gamesData}
                loggedIn={loggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                fetchStreamers={fetchStreamers}
                loading={loading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                streamerData={streamerData}
                loggedIn={loggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                fetchStreamers={fetchStreamers}
                loading={loading}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
