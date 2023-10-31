import { StreamList } from '../components/StreamList';
import { useEffect } from 'react';

export default function Home({
  streamerData,
  loggedIn,
  favorites,
  setFavorites,
  fetchStreamers,
  loading,
}) {
  useEffect(() => {
    fetchStreamers('online');
  }, []);
  return (
    <>
      <div className="welcome flex flex-col items-center gap-12 mb-24">
        <h1 className="text-4xl font-logo text-center">
          Welcome to <br />
          &apos;Is My Streamer Online&apos;
        </h1>
        <p className="text-xl font-game">
          Find the online status of your favorite streamer across all streaming
          platforms
        </p>
      </div>
      <StreamList
        streamerData={streamerData}
        title="Top Streamers"
        loggedIn={loggedIn}
        favorites={favorites}
        setFavorites={setFavorites}
        fetchStreamers={fetchStreamers}
        loading={loading}
      />
    </>
  );
}
