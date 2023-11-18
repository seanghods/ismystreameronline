import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import useStream from '../../Context/useStream';
import { useState } from 'react';

export default function FavoriteButton({ streamer, stop }) {
  const [showLikeTooltip, setShowLikeTooltip] = useState(false);
  const { loggedIn, favorites, setFavorites } = useStream();
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
              deleteFavorite(streamer.id, favorites, setFavorites);
            } else if (!favorites.includes(streamer.id)) {
              addFavorite(streamer.id, setFavorites);
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
