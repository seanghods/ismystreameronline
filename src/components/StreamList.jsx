import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LaptopIcon from '@mui/icons-material/Laptop';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TwitchIcon, YouTubeIcon, KickIcon } from './Icons';

export function StreamList({
  streamerData,
  title,
  loggedIn,
  favorites,
  setFavorites,
  filter,
  gameName,
}) {
  async function addFavorite(streamerId, setFavorites) {
    setFavorites(prevFavorites => [...prevFavorites, streamerId]);
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({ id: streamerId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to like the streamer');
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to like the streamer');
      }
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation:',
        error.message,
      );
      setFavorites(prevFavorites =>
        prevFavorites.filter(id => id !== streamerId),
      );
    }
  }
  async function deleteFavorite(streamerId, favorites, setFavorites) {
    const updatedFavorites = favorites.filter(id => id !== streamerId);
    setFavorites(updatedFavorites);
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        body: JSON.stringify({ id: streamerId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete the streamer');
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to delete the streamer');
      }
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation:',
        error.message,
      );
      setFavorites(prevFavorites => [...prevFavorites, streamerId]);
    }
  }
  return (
    <>
      <div className="streamer-list flex flex-col gap-2 items-center">
        <h2 className="font-logo text-3xl mb-5">{title}</h2>
        <div className="flex font-logo w-2/3 text-center">
          <div className="w-6"></div>
          <div className="flex-1">
            <PersonIcon />
          </div>
          <div className="flex-1">
            <VisibilityIcon />
          </div>
          <div className="flex-1">
            {' '}
            <SportsEsportsIcon />
          </div>
          <div className="flex-1">
            <LaptopIcon />
          </div>
          <div className="flex-1">
            <ArrowForwardIcon />
          </div>
        </div>
        {filter == 'favorites' && favorites.length == 0 ? (
          <div className="m-12 font-bold text-xl text-sky-500 font-game">
            You have no favorites yet! Go like your favorite streamers.{' '}
          </div>
        ) : null}
        {streamerData
          .filter(streamer => streamer.online === true)
          .sort((a, b) => b.viewers - a.viewers)
          .map((streamer, index) => {
            if (filter == 'game' && streamer.game.name !== gameName) {
              return null;
            }
            if (filter == 'favorites' && !favorites.includes(streamer.id)) {
              return null;
            }
            return (
              <div
                key={index}
                className="flex font-game font-bold text-md p-2 w-2/3 text-center justify-center items-center hover:bg-[#abdbe3] hover:cursor-pointer rounded-lg"
              >
                <button
                  onClick={() => {
                    if (loggedIn) {
                      if (favorites.includes(streamer.id)) {
                        deleteFavorite(streamer.id, favorites, setFavorites);
                      } else if (!favorites.includes(streamer.id)) {
                        addFavorite(streamer.id, setFavorites);
                      }
                    }
                  }}
                  className="w-6"
                >
                  {loggedIn && favorites.includes(streamer.id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </button>
                <div className="flex-1">{streamer.name}</div>
                <div className="flex-1">
                  {streamer.viewers.toLocaleString()}
                </div>
                <div className="flex-1">{streamer.game.name}</div>
                <div className="flex-1 flex justify-center">
                  {streamer.platform == 'Twitch' ? (
                    <TwitchIcon />
                  ) : streamer.platform == 'YouTube' ? (
                    <YouTubeIcon />
                  ) : streamer.platform == 'Kick' ? (
                    <KickIcon />
                  ) : null}
                </div>
                <div className="flex-1">
                  <button className="bg-[#0FFF50] rounded-md px-5 py-2 shadow-md transform transition duration-250 hover:scale-105">
                    Online
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
