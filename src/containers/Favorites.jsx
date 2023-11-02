import { StreamList } from '../components/StreamList';
import { useEffect } from 'react';
export default function Favorites({ fetchStreamers }) {
  useEffect(() => {
    fetchStreamers(null, null, true);
  }, [fetchStreamers]);
  return (
    <>
      <StreamList title="Favorites" filter="favorites" />
    </>
  );
}
