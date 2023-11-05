import FavoriteButton from './sub-components/FavoriteButton';
import EmbedPlayer from './sub-components/EmbedPlayer';
import Tooltip from '@mui/material/Tooltip';
import { TwitchIcon, YouTubeIcon, KickIcon } from './sub-components/Icons';
import { useEffect } from 'react';
import useStream from '../Context/useStream';
import { PulseIcon } from './sub-components/Icons';

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
        return 'bg-purple-300';
      case 'Kick':
        return 'bg-green-100';
      case 'YouTube':
        return 'bg-red-200';
      default:
        return 'bg-gray-500';
    }
  }
  useEffect(() => {
    return () => {
      if (activeDropdown == streamer.id) setActiveDropdown(null);
    };
  }, []);
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
        enterDelay={250}
        enterNextDelay={200}
        leaveDelay={50}
      >
        <div
          className={`flex font-game font-bold text-md p-2 w-full text-center justify-center items-center hover:cursor-pointer rounded-lg ${
            'hover:' + getHoverColor(streamer.platform)
          } ${
            activeDropdown == streamer.id ? 'bg-gray-200 rounded-b-none' : ''
          }`}
          onClick={() => {
            setShouldRenderContent(false);
            setActiveDropdown(
              activeDropdown === streamer.id ? null : streamer.id,
            );
          }}
        >
          <FavoriteButton streamer={streamer} />
          <div className="flex w-[30px]">
            {filter == 'favorites' && streamer.online == false ? (
              <PulseIcon status="offline" />
            ) : (
              <PulseIcon status="online" />
            )}
          </div>
          <div className="w-[100px] md:w-[225px] flex md:px-3 md:pl-12 whitespace-nowrap overflow-ellipsis overflow-hidden">
            {streamer.name}
          </div>
          <div className="w-[40px] md:w-[120px] flex items-center justify-center">
            {streamer.platform == 'Twitch' ? (
              <TwitchIcon />
            ) : streamer.platform == 'YouTube' ? (
              <YouTubeIcon />
            ) : streamer.platform == 'Kick' ? (
              <KickIcon />
            ) : null}
          </div>
          <div className="w-[80px]">{streamer.viewers.toLocaleString()}</div>
          <div className="w-1/5 whitespace-nowrap overflow-ellipsis overflow-hidden">
            {streamer.game.name}
          </div>
          <div className="flex-1 self-stretch items-center text-left overflow-hidden hidden md:flex">
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
