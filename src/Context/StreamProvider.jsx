import { StreamContext } from './StreamContext';
import { useState } from 'react';

export function StreamProvider({ children }) {
  const [streamerData, setStreamerData] = useState([]);
  const [gamesData, setGames] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState([]);
  const [shouldRenderContent, setShouldRenderContent] = useState({});
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

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
        favoritesData,
        setFavoritesData,
        loading,
        setLoading,
        activeDropdown,
        setActiveDropdown,
        shouldRenderContent,
        setShouldRenderContent,
        results,
        setResults,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}
