import { StreamList } from '../components/StreamList';
import { useEffect } from 'react';
export default function Favorites({
  streamerData,
  loggedIn,
  favorites,
  setFavorites,
  fetchStreamers,
  loading,
}) {
  useEffect(() => {
    fetchStreamers(null, null, true);
  }, []);
  return (
    <>
      <StreamList
        streamerData={streamerData}
        title="Favorites"
        loggedIn={loggedIn}
        favorites={favorites}
        setFavorites={setFavorites}
        filter="favorites"
        loading={loading}
      />
    </>
  );
}
