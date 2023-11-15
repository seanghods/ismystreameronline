import { StreamList } from '../components';
import { useEffect } from 'react';

export default function Home({ fetchStreamers, fetchMoreStreamers }) {
  useEffect(() => {
    fetchStreamers('online');
  }, [fetchStreamers]);
  return (
    <>
      <div className="welcome flex flex-col items-center gap-5 mb-10 md:gap-12 md:mb-24">
        <h1 className="text-2xl md:text-4xl font-logo text-center">
          Welcome to <br />
          &apos;Is My Streamer Online&apos;
        </h1>
        <p className="text-md w-4/5 md:text-xl font-game text-center">
          Find the online status of your favorite streamer across all streaming
          platforms
        </p>
      </div>
      <StreamList
        title="Top Streamers"
        fetchMoreStreamers={fetchMoreStreamers}
      />
    </>
  );
}
