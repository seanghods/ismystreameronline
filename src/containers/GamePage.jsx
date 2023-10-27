import { useParams } from 'react-router-dom';
import { StreamList } from '../components/StreamList';

export function GamePage({ streamerData, gamesData }) {
  const gameSlug = useParams().name;
  const game = gamesData.find(game => game.slugName == gameSlug);
  const gameName = game.name;

  return (
    <>
      <StreamList
        streamerData={streamerData}
        title={gameName}
        gameFilter={gameName}
      />
    </>
  );
}
