import { useParams } from 'react-router-dom';
import { StreamList } from '../components';
import { useEffect } from 'react';
import useStream from '../Context/useStream';

export default function GamePage({ fetchStreamers, fetchMoreStreamers }) {
  const { gamesData } = useStream();
  const gameSlug = useParams().name;
  const game = gamesData
    ? gamesData.find(game => game.slugName == gameSlug)
    : null;
  const gameName = game ? game.name : null;
  // let gameName;
  // async function findGameName(gameSlug) {
  //   const response = await fetch(`/api/find-game?slug=${gameSlug}`);
  //   const data = await response.json();
  //   gameName = data.name;
  // }
  // useEffect(() => {
  //   findGameName(gameSlug);
  // });
  useEffect(() => {
    async function callFetchStreamers() {
      await fetchStreamers('online', gameSlug, null);
    }
    callFetchStreamers();
  }, [gameSlug, fetchStreamers]);
  return (
    <>
      <StreamList
        title={gameName}
        gameSlug={gameSlug}
        filter="game"
        fetchMoreStreamers={fetchMoreStreamers}
      />
    </>
  );
}
