import Header from './components/Header';
import NavBar from './components/NavBar';
import AccountModal from './components/AccountModal';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import { GamePage } from './containers/GamePage';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [streamerData, setStreamerData] = useState([
    {
      name: 'Bob',
      online: true,
      game: 'League Of Legends',
      platform: 'Twitch',
      viewers: 100000,
    },
    {
      name: 'BigComputerGuy',
      online: true,
      game: 'Fortnite',
      platform: 'Kick',
      viewers: 1200,
    },
    {
      name: 'Stacy',
      online: true,
      game: 'Counter-Strike Go',
      platform: 'YouTube',
      viewers: 500,
    },
    { name: 'John', online: false, game: '', viewers: 0 },
  ]);
  const [gamesData, setGames] = useState([
    {
      name: 'League of Legends',
      slugName: 'league-of-legends',
      totalStreamers: 1,
      totalViewers: 100000,
    },
    {
      name: 'Counter-Strike',
      slugName: 'counter-strike',
      totalStreamers: 1,
      totalViewers: 500,
    },
    {
      name: 'Fortnite',
      slugName: 'fortnite',
      totalStreamers: 1,
      totalViewers: 1200,
    },
    {
      name: 'World of Warcraft',
      slugName: 'world-of-warcraft',
      totalStreamers: 0,
      totalViewers: 0,
    },
  ]);
  const [showModal, setShowModal] = useState('');
  useEffect(() => {
    async function fetchStreamers() {
      const response = await fetch('/api/streamers');
      if (!response.ok) console.log('error');
      const streamersList = await response.json();
      setStreamerData(streamersList);
    }
    fetchStreamers();
  }, []);
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
        <AccountModal showModal={showModal} setShowModal={setShowModal} />
      ) : null}
      <NavBar gamesData={gamesData} />
      <div className="flex-col w-full">
        <Header setShowModal={setShowModal} />
        <Routes>
          <Route path="/" element={<Home streamerData={streamerData} />} />
          <Route
            path="/game/:name"
            element={
              <GamePage streamerData={streamerData} gamesData={gamesData} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
