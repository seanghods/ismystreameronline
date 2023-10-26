import { useParams } from 'react-router-dom';
import { StreamList } from '../components/StreamList';

export function GamePage({ streamerData, currentGameFilter }) {
  const gameSlug = useParams().name;
  const gameUnSlug = deslugify(gameSlug);
  function deslugify(slug) {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <>
      <StreamList
        streamerData={streamerData}
        title={gameUnSlug}
        gameFilter={currentGameFilter}
      />
    </>
  );
}
