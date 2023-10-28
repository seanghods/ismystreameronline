import { StreamList } from '../components/StreamList';

export default function Favorites({
  streamerData,
  loggedIn,
  favorites,
  setFavorites,
}) {
  return (
    <>
      <StreamList
        streamerData={streamerData}
        title="Favorites"
        loggedIn={loggedIn}
        favorites={favorites}
        setFavorites={setFavorites}
        filter="favorites"
      />
    </>
  );
}
