import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import { GamePage } from './containers/GamePage';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    { name: 'League Of Legends', totalStreamers: 1, totalViewers: 100000 },
    { name: 'Counter-Strike Go', totalStreamers: 1, totalViewers: 500 },
    { name: 'Fortnite', totalStreamers: 1, totalViewers: 1200 },
    { name: 'World of Warcraft', totalStreamers: 0, totalViewers: 0 },
  ]);
  const [currentGameFilter, setCurrentGameFilter] = useState();
  const [searchInput, setSearchInput] = useState();
  return (
    <>
      <NavBar gamesData={gamesData} setFilter={setCurrentGameFilter} />
      <div className="flex-col w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home streamerData={streamerData} />} />
          <Route
            path="/game/:name"
            element={
              <GamePage
                streamerData={streamerData}
                currentGameFilter={currentGameFilter}
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
