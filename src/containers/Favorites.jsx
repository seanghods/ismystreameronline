import { StreamList } from '../components/';
import { useEffect } from 'react';
import useStream from '../Context/useStream';

export default function Favorites({ fetchStreamers, fetchMoreStreamers }) {
  const { loggedIn } = useStream();
  useEffect(() => {
    fetchStreamers(null, null, true);
  }, [fetchStreamers]);
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center flex-col gap-24">
        <h1 className="font-logo text-3xl">Error!</h1>
        <p className="font-game italic text-lg">
          Please login to visit favorites
        </p>
      </div>
    );
  }
  return (
    <>
      <StreamList
        title="Favorites"
        filter="favorites"
        fetchMoreStreamers={fetchMoreStreamers}
      />
    </>
  );
}
