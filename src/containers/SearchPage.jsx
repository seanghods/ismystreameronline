import useStream from '../Context/useStream';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import LaptopIcon from '@mui/icons-material/Laptop';
import FavoriteButton from '../components/sub-components/FavoriteButton';
import EmbedPlayer from '../components/sub-components/EmbedPlayer';
import Tooltip from '@mui/material/Tooltip';
import {
  TwitchIcon,
  YouTubeIcon,
  KickIcon,
} from '../components/sub-components/Icons';
import { useEffect } from 'react';
import OnlineDot from '../assets/green-dot.png';
import OfflineDot from '../assets/gray-dot.png';

export default function SearchPage() {
  const {
    results,
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
      <div className="streamer-list flex justify-center flex-col gap-4 items-center">
        <h2 className="font-logo text-3xl mb-8">Search</h2>
        <div className="labels flex font-logo w-full 2xl:w-4/5 text-center mx-2 2xl:mx-0 p-2 justify-between">
          <div className="hidden md:block md:w-[85px]"></div>
          <div className="w-[225px] pr-12">
            <PersonIcon />
          </div>
          <div className="hidden md:block md:w-[130px]">
            <LaptopIcon />
          </div>
          <div className="w-[75px]">
            <VisibilityIcon />
          </div>
          <div className="w-[80px] md:w-1/4">
            {' '}
            <SportsEsportsIcon />
          </div>
          <div className="flex-1 pr-24 hidden lg:block">
            <ChatIcon />
          </div>
          <div className="w-[10px] md:hidden"></div>
        </div>
        <div className="w-full">
          <div className="flex flex-col pt-1 gap-3 items-center mx-2 2xl:mx-0">
            {results
              .filter(result => result.platform)
              .map((streamer, index) => {
                return (
                  <div
                    className="w-full 2xl:w-4/5 hover:cursor-pointer transform transition duration-250 hover:-translate-y-1 bg-white dark:bg-[#4c4a4f] rounded-lg text-gray-800 shadow-md"
                    key={index}
                  >
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
                          {streamer.online == false ? (
                            <img
                              src={OfflineDot}
                              alt="Online Symbol"
                              height="20"
                              width="20"
                            />
                          ) : (
                            <img
                              src={OnlineDot}
                              alt="Online Symbol"
                              height="24"
                              width="24"
                            />
                          )}
                        </div>
                        <div className="w-[33px] h-[33px]">
                          <img
                            src={streamer.thumbnailUrl}
                            className="rounded-2xl"
                            alt=""
                          />
                        </div>
                        <div
                          className={`w-[100px] pl-2 items-center md:w-[180px] flex md:px-3 font-gamebold whitespace-nowrap overflow-ellipsis overflow-hidden ${getTextColor(
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
                        <div className="w-[50px] flex items-center justify-center md:hidden">
                          {convertToK(streamer.viewers)}
                        </div>
                        <div className="md:flex-initial flex items-center justify-center w-1/4 font-gamebold whitespace-nowrap overflow-ellipsis overflow-hidden">
                          {streamer.game.name}
                        </div>
                        <div className="flex-1 self-stretch items-center text-left overflow-hidden hidden lg:flex">
                          <div className="whitespace-nowrap overflow-ellipsis overflow-hidden pr-3">
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
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
