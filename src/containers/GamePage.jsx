import { useParams } from 'react-router-dom';
import { StreamList } from '../components/StreamList';
import { useEffect } from 'react';

export function GamePage({
  streamerData,
  gamesData,
  loggedIn,
  favorites,
  setFavorites,
  fetchStreamers,
  loading,
}) {
  const gameSlug = useParams().name;
  const game = gamesData
    ? gamesData.find(game => game.slugName == gameSlug)
    : null;
  const gameName = game ? game.name : null;

  useEffect(() => {
    async function callFetchStreamers() {
      await fetchStreamers('online', gameSlug, null);
    }
    callFetchStreamers();
  }, [gameSlug]);
  return (
    <>
      <StreamList
        streamerData={streamerData}
        title={gameName}
        loggedIn={loggedIn}
        favorites={favorites}
        setFavorites={setFavorites}
        filter="game"
        loading={loading}
      />
    </>
  );
}
