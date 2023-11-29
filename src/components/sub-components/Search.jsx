import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { TwitchIcon, YouTubeIcon, KickIcon } from './Icons';
import FavoriteButton from './FavoriteButton';
import OnlineDot from '../../assets/green-dot.png';
import OfflineDot from '../../assets/gray-dot.png';
import useStream from '../../Context/useStream';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../../utils/constants';
import SportsEsports from '@mui/icons-material/SportsEsports';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(
    'Search streamer or game...',
  );
  const { results, setResults } = useStream();
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = debounce(async query => {
    const response = await fetch(`${API_ROUTES.search}?q=${query}`);
    const data = await response.json();
    setResults(data);
  }, 300);

  useEffect(() => {
    if (query.length > 2) {
      handleSearch(query);
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [query]);
  useEffect(() => {
    function updatePlaceholder() {
      setPlaceholderText(
        window.innerWidth <= 768 ? 'Search...' : 'Search streamer or game...',
      );
    }
    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);
    return () => window.removeEventListener('resize', updatePlaceholder);
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
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
        return 'hover:bg-sky-400';
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
        className="rounded-lg p-3 w-[100px] md:w-auto md:block dark:bg-gray-300"
        onKeyDown={e => {
          if (e.key == 'Enter') navigate('/search');
        }}
        placeholder={placeholderText}
      />
      {isDropdownVisible && (
        <ul className="search-dropdown rounded-lg bg-white z-50 dark:bg-gray-700 absolute left-10 md:left-auto w-4/5 md:w-[350px]">
          {results.length == 0 && (
            <div className="rounded-lg font-gamebold p-3 flex justify-between">
              No results...{' '}
              <NavLink to="/request" className=" text-blue-400">
                Add a new streamer
              </NavLink>
            </div>
          )}
          {results.map((result, index) => (
            <NavLink
              key={index}
              to={result.platform ? '/search' : `/game/${result.slugName}`}
              className={`search-result-item rounded-lg font-gamebold p-3 flex justify-between ${getHoverColor(
                result.platform,
              )}`}
            >
              <div className="flex gap-2 items-center">
                {result.platform ? (
                  <FavoriteButton streamer={result} />
                ) : (
                  <SportsEsports />
                )}
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
                {result.thumbnailUrl ? (
                  <div className="w-[33px] h-[33px]">
                    <img
                      src={result.thumbnailUrl}
                      className="rounded-2xl"
                      alt=""
                    />
                  </div>
                ) : null}
                <div
                  className={`whitespace-nowrap overflow-ellipsis overflow-hidden ${getTextColor(
                    result.platform,
                  )}`}
                >
                  {result.name}{' '}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {result.platform == 'Twitch' ? (
                  <TwitchIcon />
                ) : result.platform == 'YouTube' ? (
                  <YouTubeIcon />
                ) : result.platform == 'Kick' ? (
                  <KickIcon />
                ) : null}
              </div>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
}
