import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import LaptopIcon from '@mui/icons-material/Laptop';
import {
  KickIcon,
  LoadingIcon,
  TwitchIcon,
  YouTubeIcon,
} from './sub-components/Icons';
import { Transition } from '@headlessui/react';
import StreamerItem from './StreamerItem';
import useStream from '../Context/useStream';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import MultiToggle from 'react-multi-toggle';

export default function StreamList({
  title,
  filter,
  gameSlug,
  fetchStreamers,
  fetchMoreStreamers,
}) {
  const [toggleValue, setToggleValue] = useState('');
  const [showOffline, setShowOffline] = useState(false);
  const {
    streamerData: contextStreamerData,
    favoritesData,
    results,
    loading,
    hasMore,
  } = useStream();
  let streamerData;
  if (filter == 'favorites') {
    streamerData = favoritesData;
  } else if (filter == 'search') {
    streamerData = results
      .filter(each => each.platform)
      .sort((a, b) => {
        if (a.online === b.online) {
          return b.viewers - a.viewers;
        }
        return b.online - a.online;
      });
  } else {
    streamerData = contextStreamerData;
  }
  useEffect(() => {
    if (filter !== 'favorites' && filter !== 'search') {
      fetchStreamers('online', gameSlug, toggleValue);
    }
  }, [toggleValue]);
  const groupOptions = [
    { displayName: 'All', value: 'all' },
    {
      displayName: <TwitchIcon />,
      value: 'Twitch',
      optionClass: 'purple',
    },
    { displayName: <KickIcon />, value: 'Kick', optionClass: 'green' },
    { displayName: <YouTubeIcon />, value: 'YouTube', optionClass: 'red' },
  ];
  return (
    <>
      <div className="streamer-list flex flex-col gap-4 items-center">
        <h2 className="font-logo text-3xl cursor-default">
          {title || 'Unavailable'}
        </h2>
        <div className="w-full lg:w-4/5 ">
          <MultiToggle
            options={groupOptions}
            selectedOption={toggleValue}
            onSelectOption={value => {
              setToggleValue(value);
            }}
            className="flex dark:bg-[#4c4a4f] relative z-0"
          />
        </div>
        <div className="labels flex font-logo w-full lg:w-4/5 text-center mx-2 2xl:mx-0 p-2 justify-between">
          <div className="hidden md:block md:w-[85px]"></div>
          <div className="w-[205px] md:w-[170px] 2xl:w-[205px] pr-12">
            <PersonIcon />
          </div>
          <div className="hidden md:block md:pl-10 md:w-[100px] 2xl:w-[130px]">
            <LaptopIcon />
          </div>
          <div className="w-[65px] 2xl:w-[80px]">
            <VisibilityIcon />
          </div>
          <div className="hidden 2xl:block 2xl:w-[15px]"></div>
          <div className="w-[50px] md:w-1/5">
            {' '}
            <SportsEsportsIcon />
          </div>
          <div className="flex-1 hidden lg:block">
            <ChatIcon />
          </div>
          <div className="w-[10px] md:hidden"></div>
        </div>
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
          className="w-full"
        >
          {loading ? null : (
            <>
              <div className="w-full mb-24">
                <InfiniteScroll
                  dataLength={streamerData.length}
                  className="flex flex-col select-none pt-1 gap-3 items-center mx-2 2xl:mx-0"
                  next={() => {
                    if (filter == 'favorites' || filter == 'search') {
                      null;
                    } else if (filter == 'game') {
                      fetchMoreStreamers(
                        'online',
                        gameSlug,
                        streamerData,
                        toggleValue,
                      );
                    } else {
                      fetchMoreStreamers(
                        'online',
                        null,
                        streamerData,
                        toggleValue,
                      );
                    }
                  }}
                  hasMore={
                    filter == 'favorites' || filter == 'search'
                      ? false
                      : hasMore
                  }
                  loader={
                    <div className="flex justify-center">
                      <LoadingIcon width="75px" height="75px" />
                    </div>
                  }
                >
                  {streamerData.length == 0 && filter == 'game' && (
                    <div className="font-game italic">
                      No streamers we are tracking are currently playing this
                      game...
                    </div>
                  )}
                  {streamerData
                    .filter(streamer => {
                      if (
                        (filter == 'favorites' || filter == 'search') &&
                        toggleValue &&
                        toggleValue !== 'all'
                      ) {
                        return streamer.platform == toggleValue;
                      } else {
                        return true;
                      }
                    })
                    .filter(streamer => (showOffline ? true : streamer.online))
                    .map((streamer, index) => {
                      return (
                        <div
                          className="w-full lg:w-4/5 hover:cursor-pointer transform transition duration-250 hover:-translate-y-1 bg-white dark:bg-[#4c4a4f] rounded-lg text-gray-800 shadow-md"
                          key={index}
                        >
                          <StreamerItem
                            streamer={streamer}
                            index={index}
                            filter={filter}
                          />
                        </div>
                      );
                    })}
                  {filter == 'favorites' ? (
                    showOffline ? (
                      <button
                        onClick={() => setShowOffline(false)}
                        className="font-gamebold flex items-center justify-center rounded-md tracking-wider px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#94adff] to-[#5ba1fd] hover:text-white transform transition duration-250 dark:hover:text-gray-200"
                      >
                        Hide Offline
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowOffline(true)}
                        className="font-gamebold flex items-center justify-center rounded-md tracking-wider px-3 py-1 text-xs text-gray-700 font-medium bg-gradient-to-r from-[#94adff] to-[#5ba1fd] hover:text-white transform transition duration-250 dark:hover:text-gray-200"
                      >
                        Show Offline
                      </button>
                    )
                  ) : null}
                </InfiniteScroll>
              </div>
            </>
          )}
        </Transition>
      </div>
    </>
  );
}
