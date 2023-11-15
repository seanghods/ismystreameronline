import { StreamContext } from './StreamContext';
import { useState } from 'react';

export function StreamProvider({ children }) {
  const [streamerData, setStreamerData] = useState([]);
  const [gamesData, setGames] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState([]);
  const [shouldRenderContent, setShouldRenderContent] = useState({});

  return (
    <StreamContext.Provider
      value={{
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
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}
