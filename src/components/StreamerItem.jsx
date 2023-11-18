import FavoriteButton from './sub-components/FavoriteButton';
import EmbedPlayer from './sub-components/EmbedPlayer';
import Tooltip from '@mui/material/Tooltip';
import { TwitchIcon, YouTubeIcon, KickIcon } from './sub-components/Icons';
import { useEffect } from 'react';
import useStream from '../Context/useStream';
// import { PulseIcon } from './sub-components/Icons';
import OnlineDot from '../assets/green-dot.png';
import OfflineDot from '../assets/gray-dot.png';

export default function StreamerItem({ streamer, index, filter }) {
  const {
    activeDropdown,
    setActiveDropdown,
    shouldRenderContent,
    setShouldRenderContent,
  } = useStream();
  function getHoverColor(platform) {
    switch (platform) {
      case 'Twitch':
        return 'bg-purple-300 hover:dark:bg-purple-800';
      case 'Kick':
        return 'bg-green-100 hover:dark:bg-green-800';
      case 'YouTube':
        return 'bg-red-200 hover:dark:bg-red-700';
      default:
        return 'bg-gray-500';
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
  function handleStreamerClick(streamer) {
    if (streamer.online) {
      setActiveDropdown(prev => {
        if (prev.includes(streamer.id)) {
          return prev.filter(id => id !== streamer.id);
        } else {
          return [...prev, streamer.id];
        }
      });

      if (shouldRenderContent[streamer.id]) {
        setShouldRenderContent(prev => ({ ...prev, [streamer.id]: false }));
      } else {
        setTimeout(() => {
          setShouldRenderContent(prev => ({
            ...prev,
            [streamer.id]: true,
          }));
        }, 400);
      }
    }
  }
  useEffect(() => {
    return () => {
      setActiveDropdown([]);
      setShouldRenderContent({});
    };
  }, []);
  function convertToK(number) {
    if (number < 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return Math.round(number / 1000) + 'K';
    }
  }

  return (
    <>
      {/* <div className="fix-hover">
        <div className="hover:bg-purple-300">Test</div>
        <div className="hover:bg-green-100">Test</div>
        <div className="hover:bg-red-200">Test</div>
      </div> */}
      <Tooltip
        title={streamer.title}
        key={index}
        placement="top"
        classes={{ tooltip: 'title-tooltip' }}
        enterDelay={400}
        enterNextDelay={400}
        leaveDelay={50}
      >
        <div
          className={`flex font-game font-bold text-md p-2 w-full text-center justify-between hover:cursor-pointer rounded-lg ${
            'hover:' + getHoverColor(streamer.platform)
          } ${
            activeDropdown == streamer.id
              ? 'bg-gray-200 dark:bg-gray-700 rounded-b-none'
              : ''
          }`}
          onClick={() => {
            handleStreamerClick(streamer);
          }}
        >
          <FavoriteButton streamer={streamer} stop={true} />
          <div className="flex w-[30px] md:w-[80px] justify-center items-center">
            {filter == 'favorites' && streamer.online == false ? (
              <img
                src={OfflineDot}
                alt="Online Symbol"
                height="20"
                width="20"
              />
            ) : (
              // <PulseIcon status="offline" />
              // <PulseIcon status="online" />
              <img src={OnlineDot} alt="Online Symbol" height="24" width="24" />
            )}
          </div>
          <div
            className={`w-[100px] md:w-[180px] flex md:px-3 font-gamebold whitespace-nowrap overflow-ellipsis overflow-hidden ${getTextColor(
              streamer.platform,
            )}`}
          >
            {streamer.name}
          </div>
          <div className="w-[35px] md:w-[120px] flex items-center justify-center">
            {streamer.platform == 'Twitch' ? (
              <TwitchIcon />
            ) : streamer.platform == 'YouTube' ? (
              <YouTubeIcon />
            ) : streamer.platform == 'Kick' ? (
              <KickIcon />
            ) : null}
          </div>
          <div className="w-[80px] hidden md:block">
            {streamer.viewers.toLocaleString()}
          </div>
          <div className="w-[50px] md:hidden">
            {convertToK(streamer.viewers)}
          </div>
          <div className="md:flex-initial w-1/4 font-gamebold whitespace-nowrap overflow-ellipsis overflow-hidden">
            {streamer.game.name}
          </div>
          <div className="flex-1 self-stretch items-center text-left overflow-hidden hidden lg:flex">
            <div className="whitespace-nowrap overflow-ellipsis overflow-hidden pr-16">
              {streamer.title}
            </div>
          </div>
        </div>
        <EmbedPlayer
          streamer={streamer}
          activeDropdown={activeDropdown}
          shouldRenderContent={shouldRenderContent}
        />
      </Tooltip>
    </>
  );
}
