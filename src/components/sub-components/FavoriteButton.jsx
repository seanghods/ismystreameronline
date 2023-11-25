import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import useStream from '../../Context/useStream';
import { useState } from 'react';
import { API_ROUTES } from '../../utils/constants';

export default function FavoriteButton({ streamer, stop }) {
  const [showLikeTooltip, setShowLikeTooltip] = useState(false);
  const { loggedIn, favorites, setFavorites, setFavoritesData, favoritesData } =
    useStream();
  // async function getFavoritesData() {
  //   if (loggedIn) {
  //     const response = await fetch(API_ROUTES.favoritesData, {
  //       credentials: 'include',
  //       withCredentials: true,
  //     });
  //     const data = await response.json();
  //     setFavoritesData(data);
  //   }
  // }
  async function addFavorite(streamer) {
    setFavorites(prevFavorites => [...prevFavorites, streamer.id]);
    setFavoritesData(prevData =>
      [...prevData, streamer].sort((a, b) => {
        if (a.online === b.online) {
          return b.viewers - a.viewers; // Sort by viewers if online status is the same
        }
        return b.online - a.online; // Otherwise, sort by online status
      }),
    );
    try {
      const response = await fetch(API_ROUTES.favorites, {
        method: 'POST',
        body: JSON.stringify({ id: streamer.id }),
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
        prevFavorites.filter(id => id !== streamer.id),
      );
    }
  }
  async function deleteFavorite(streamer, favorites, favoritesData) {
    const updatedFavorites = favorites.filter(id => id !== streamer.id);
    setFavorites(updatedFavorites);
    const updatedFavoritesData = favoritesData.filter(
      obj => obj.id !== streamer.id,
    );
    setFavoritesData(updatedFavoritesData);
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        body: JSON.stringify({ id: streamer.id }),
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
      setFavorites(prevFavorites => [...prevFavorites, streamer.id]);
      setFavoritesData(prevData =>
        [...prevData, streamer].sort((a, b) => {
          if (a.online === b.online) {
            return b.viewers - a.viewers; // Sort by viewers if online status is the same
          }
          return b.online - a.online; // Otherwise, sort by online status
        }),
      );
    }
  }
  return (
    <Tooltip
      title="Log in to register likes"
      placement="top-start"
      classes={{ tooltip: 'like-tooltip' }}
      arrow
      open={showLikeTooltip == streamer.id}
      disableHoverListener // This disables the hover behavior
    >
      <button
        onClick={e => {
          if (stop) e.stopPropagation();
          if (loggedIn) {
            if (favorites.includes(streamer.id)) {
              deleteFavorite(streamer, favorites, favoritesData);
            } else if (!favorites.includes(streamer.id)) {
              addFavorite(streamer);
            }
          } else if (!showLikeTooltip) {
            setShowLikeTooltip(streamer.id);
            setTimeout(() => setShowLikeTooltip(false), 2000);
          }
        }}
        className={`w-6`}
      >
        {loggedIn && favorites.includes(streamer.id) ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </button>
    </Tooltip>
  );
}
