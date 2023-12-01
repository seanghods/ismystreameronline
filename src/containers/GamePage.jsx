import { useParams } from 'react-router-dom';
import { StreamList } from '../components';
import { useEffect, useState } from 'react';
import { LoadingIcon } from '../components/sub-components/Icons';

export default function GamePage({ fetchStreamers, fetchMoreStreamers }) {
  const [loading, setLoading] = useState(false);
  const [gameName, setGameName] = useState('');

  const gameSlug = useParams().name;
  async function findGameName(gameSlug) {
    const response = await fetch(`/api/find-game?slug=${gameSlug}`);
    const data = await response.json();
    setGameName(data.name);
  }
  useEffect(() => {
    setLoading(true);
    findGameName(gameSlug);
    setLoading(false);
  }, [gameSlug]);
  useEffect(() => {
    async function callFetchStreamers() {
      await fetchStreamers('online', gameSlug, undefined);
    }
    callFetchStreamers();
  }, [gameSlug, fetchStreamers]);
  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <StreamList
          title={gameName}
          gameSlug={gameSlug}
          filter="game"
          fetchStreamers={fetchStreamers}
          fetchMoreStreamers={fetchMoreStreamers}
        />
      )}
    </>
  );
}
