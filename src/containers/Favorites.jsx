import { StreamList } from '../components/';
import { useEffect } from 'react';

export default function Favorites({ fetchStreamers, fetchMoreStreamers }) {
  useEffect(() => {
    fetchStreamers(null, null, true);
  }, [fetchStreamers]);
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
