import { StreamList } from '../components/';
import useStream from '../Context/useStream';

export default function Favorites({ fetchMoreStreamers }) {
  const { loggedIn } = useStream();
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
