import { StreamList } from '../components/StreamList';
import { useEffect } from 'react';
export default function Favorites({ fetchStreamers }) {
  useEffect(() => {
    fetchStreamers(null, null, true);
  }, []);
  return (
    <>
      <StreamList title="Favorites" filter="favorites" />
    </>
  );
}
