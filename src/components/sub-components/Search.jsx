import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { TwitchIcon, YouTubeIcon, KickIcon } from './Icons';
import FavoriteButton from './FavoriteButton';
import OnlineDot from '../../assets/green-dot.png';
import OfflineDot from '../../assets/gray-dot.png';
import useStream from '../../Context/useStream';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { results, setResults } = useStream();
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = debounce(async query => {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    console.log(data);
    setResults(data);
  }, 300);

  useEffect(() => {
    if (query.length > 2) {
      // Trigger search when query length is more than 2 characters
      handleSearch(query);
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // Hide dropdown
      }
    }

    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownVisible]);
  useEffect(() => {
    setQuery('');
  }, [location]);
  function getHoverColor(platform) {
    switch (platform) {
      case 'Twitch':
        return 'hover:bg-purple-300 hover:dark:bg-purple-800';
      case 'Kick':
        return 'hover:bg-green-100 hover:dark:bg-green-800';
      case 'YouTube':
        return 'hover:bg-red-200 hover:dark:bg-red-700';
      default:
        return 'hover:bg-sky-200';
    }
  }
  function getTextColor(platform) {
    switch (platform) {
      case 'Twitch':
        return 'text-purple-800 dark:text-purple-300';
      case 'Kick':
        return 'text-green-800 dark:text-green-300';
      case 'YouTube':
        return 'text-red-700 dark:text-red-400';
      default:
        return;
    }
  }
  return (
    <div ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="rounded-lg p-3 w-[50px] md:w-auto md:block dark:bg-gray-300"
        onKeyDown={e => {
          if (e.key == 'Enter') navigate('/search');
        }}
        placeholder="Search streamer or game"
      />
      {isDropdownVisible && (
        <ul className="search-dropdown bg-gray-200 dark:bg-gray-700 z-50 absolute w-[180px] md:w-[350px]">
          {results.map((result, index) => (
            <NavLink
              key={index}
              to={result.platform ? '/search' : `/game/${result.slugName}`}
              className={`search-result-item font-gamebold p-2 flex justify-between ${getHoverColor(
                result.platform,
              )}`}
            >
              <div className="flex gap-2 items-center">
                {result.platform && <FavoriteButton streamer={result} />}
                {result.online ? (
                  <img
                    src={OnlineDot}
                    alt="Online Symbol"
                    className="h-[20px]"
                    width="20"
                  />
                ) : result.platform ? (
                  <img
                    src={OfflineDot}
                    alt="Offline Symbol"
                    className="h-[20px]"
                    width="20"
                  />
                ) : null}
                <div
                  className={`whitespace-nowrap overflow-ellipsis overflow-hidden ${getTextColor(
                    result.platform,
                  )}`}
                >
                  {result.name}{' '}
                </div>
              </div>
              {result.platform == 'Twitch' ? (
                <TwitchIcon />
              ) : result.platform == 'YouTube' ? (
                <YouTubeIcon />
              ) : result.platform == 'Kick' ? (
                <KickIcon />
              ) : null}
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
}
