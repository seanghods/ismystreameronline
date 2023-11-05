import Header from './components/Header';
import NavBar from './components/NavBar';
import AccountModal from './components/AccountModal';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Favorites from './containers/Favorites';
import { GamePage } from './containers/GamePage';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StreamProvider } from './Context/StreamProvider';
import useStream from './Context/useStream';

function App() {
  const {
    streamerData,
    setStreamerData,
    gamesData,
    setGames,
    loggedIn,
    setLoggedIn,
    favorites,
    setFavorites,
    loading,
    setLoading,
    activeDropdown,
    setActiveDropdown,
    shouldRenderContent,
    setShouldRenderContent,
    showLikeTooltip,
    setShowLikeTooltip,
  } = useStream();
  // const [streamerData, setStreamerData] = useState([]);
  // const [gamesData, setGames] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [favorites, setFavorites] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [activeDropdown, setActiveDropdown] = useState(null);
  // const [shouldRenderContent, setShouldRenderContent] = useState(false);
  // const [showLikeTooltip, setShowLikeTooltip] = useState(false);
  const [error, setError] = useState();
  const [lightMode, setLightMode] = useState(true);
  const [showModal, setShowModal] = useState('');

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch('/api/games');
      if (!response.ok) console.log('error');
      const gamesList = await response.json();
      setGames(gamesList);
    }
    fetchGames();
  }, [streamerData]);
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
  useEffect(() => {
    if (!activeDropdown) {
      setShouldRenderContent(false);
    }
    setTimeout(() => {
      if (activeDropdown) {
        setShouldRenderContent(true);
      }
    }, 500);
  }, [activeDropdown]);
  async function fetchStreamers(status, gameSlug, favorites) {
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
          lightMode={lightMode}
          setLightMode={setLightMode}
        />
        <Routes>
          <Route
            path="/"
            onExit={() => setActiveDropdown('')}
            element={
              <Home
                streamerData={streamerData}
                loggedIn={loggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                fetchStreamers={fetchStreamers}
                loading={loading}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                shouldRenderContent={shouldRenderContent}
                setShouldRenderContent={setShouldRenderContent}
                showLikeTooltip={showLikeTooltip}
                setShowLikeTooltip={setShowLikeTooltip}
              />
            }
          />
          <Route
            path="/game/:name"
            onExit={() => setActiveDropdown('')}
            element={
              <GamePage
                streamerData={streamerData}
                gamesData={gamesData}
                loggedIn={loggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                fetchStreamers={fetchStreamers}
                loading={loading}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                shouldRenderContent={shouldRenderContent}
                setShouldRenderContent={setShouldRenderContent}
              />
            }
          />
          <Route
            path="/favorites"
            onExit={() => setActiveDropdown('')}
            element={
              <Favorites
                streamerData={streamerData}
                loggedIn={loggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                fetchStreamers={fetchStreamers}
                loading={loading}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                shouldRenderContent={shouldRenderContent}
                setShouldRenderContent={setShouldRenderContent}
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
