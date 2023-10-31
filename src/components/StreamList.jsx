import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LaptopIcon from '@mui/icons-material/Laptop';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TwitchIcon, YouTubeIcon, KickIcon } from './Icons';
import Tooltip from '@mui/material/Tooltip';
import { LoadingIcon } from './Icons';
import { Transition } from '@headlessui/react';

export function StreamList({
  streamerData,
  title,
  loggedIn,
  favorites,
  setFavorites,
  filter,
  loading,
}) {
  function getHoverColor(platform) {
    switch (platform) {
      case 'Twitch':
        return 'hover:bg-purple-300';
      case 'Kick':
        return 'hover:bg-green-100';
      case 'YouTube':
        return 'hover:bg-red-200';
      default:
        return 'hover:bg-gray-500';
    }
  }
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
  function TitleTooltip({ title, children }) {
    return (
      <Tooltip
        title={title}
        placement="top"
        className="bg-white text-gray-800 shadow-md"
        enterDelay={200}
        leaveDelay={50}
      >
        {children}
      </Tooltip>
    );
  }
  return (
    <>
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex justify-center">
          <LoadingIcon />
        </div>
      </Transition>
      <Transition
        show={!loading}
        enter="transition-opacity duration-300 delay-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        // leave="transition-opacity duration-300"
        // leaveFrom="opacity-100"
        // leaveTo="opacity-0"
      >
        {loading ? null : (
          <div className="streamer-list flex flex-col gap-2 items-center">
            <h2 className="font-logo text-3xl mb-5">{title}</h2>
            <div className="labels flex font-logo w-2/3 text-center">
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
            {streamerData.map((streamer, index) => {
              return (
                <TitleTooltip
                  className={getHoverColor(streamer.platform)}
                  title={streamer.title}
                  key={index}
                >
                  <div
                    className={`flex font-game font-bold text-md p-2 w-2/3 text-center justify-center items-center hover:cursor-pointer rounded-lg ${getHoverColor(
                      streamer.platform,
                    )}`}
                  >
                    <button
                      onClick={() => {
                        if (loggedIn) {
                          if (favorites.includes(streamer.id)) {
                            deleteFavorite(
                              streamer.id,
                              favorites,
                              setFavorites,
                            );
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
                      {filter == 'favorites' && streamer.online == false ? (
                        <button className="bg-[#a9a9a9] rounded-md px-5 py-2 shadow-md transform transition duration-250 hover:scale-105">
                          Offline
                        </button>
                      ) : (
                        <button className="bg-[#5dff88] text-md rounded-md px-5 py-2 shadow-sm shadow-[#3b834e] transform transition duration-250 hover:scale-105">
                          Online
                        </button>
                      )}
                    </div>
                  </div>
                </TitleTooltip>
              );
            })}
          </div>
        )}
      </Transition>
    </>
  );
}
