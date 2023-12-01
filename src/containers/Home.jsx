import { StreamList } from '../components';
import { useEffect } from 'react';
import useStream from '../Context/useStream';

export default function Home({ fetchStreamers, fetchMoreStreamers }) {
  const { loggedIn } = useStream();
  useEffect(() => {
    fetchStreamers('online');
  }, [fetchStreamers]);
  return (
    <>
      {loggedIn ? (
        <StreamList
          title="Favorites"
          filter="favorites"
          fetchStreamers={fetchStreamers}
          fetchMoreStreamers={fetchMoreStreamers}
        />
      ) : (
        <div className="welcome flex flex-col items-center gap-5 mb-10 md:gap-12 md:mb-14">
          <h1 className="welcome-text text-2xl md:text-4xl font-logo text-center select-none">
            Welcome to <br />
            &apos;Is My Streamer Online&apos;
          </h1>
          <p className="text-md cursor-default w-4/5 md:text-lg font-sans italic text-center dark:text-gray-300">
            Find the online status of your favorite streamers across all
            streaming platforms.
          </p>
        </div>
      )}
      <StreamList
        title="Top Streamers"
        fetchStreamers={fetchStreamers}
        fetchMoreStreamers={fetchMoreStreamers}
      />
    </>
  );
}
