import { useParams } from 'react-router-dom';
import { StreamList } from '../components/StreamList';
import { useEffect } from 'react';
import useStream from '../Context/useStream';

export function GamePage({ fetchStreamers }) {
  const { gamesData } = useStream();
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
      <StreamList title={gameName} filter="game" />
    </>
  );
}
