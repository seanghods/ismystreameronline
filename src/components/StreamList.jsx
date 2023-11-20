import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import LaptopIcon from '@mui/icons-material/Laptop';
import { LoadingIcon } from './sub-components/Icons';
import { Transition } from '@headlessui/react';
import StreamerItem from './StreamerItem';
import useStream from '../Context/useStream';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function StreamList({
  title,
  filter,
  gameSlug,
  fetchMoreStreamers,
}) {
  const { streamerData, favorites, loading } = useStream();
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
      >
        {loading ? null : (
          <div className="streamer-list flex flex-col gap-4 items-center">
            <h2 className="font-logo text-3xl mb-8">{title}</h2>
            <div className="labels flex font-logo w-full lg:w-4/5 text-center mx-2 2xl:mx-0 p-2 justify-between">
              <div className="hidden md:block md:w-[85px]"></div>
              <div className="w-[205px] md:w-[225px] pr-12">
                <PersonIcon />
              </div>
              <div className="hidden md:block md:w-[130px]">
                <LaptopIcon />
              </div>
              <div className="w-[65px]">
                <VisibilityIcon />
              </div>
              <div className="w-[50px] md:w-1/4">
                {' '}
                <SportsEsportsIcon />
              </div>
              <div className="flex-1 pr-24 hidden lg:block">
                <ChatIcon />
              </div>
              <div className="w-[10px] md:hidden"></div>
            </div>
            {filter == 'favorites' && favorites.length == 0 ? (
              <div className="m-12 font-bold text-xl text-sky-500 font-game">
                You have no favorites yet! Go like your favorite streamers.{' '}
              </div>
            ) : null}
            <div className="w-full mb-24">
              <InfiniteScroll
                dataLength={streamerData.length}
                className="flex flex-col pt-1 gap-3 items-center mx-2 2xl:mx-0"
                next={() => {
                  if (filter == 'favorites') {
                    fetchMoreStreamers(null, null, true, streamerData);
                  } else if (filter == 'game') {
                    fetchMoreStreamers('online', gameSlug, null, streamerData);
                  } else {
                    fetchMoreStreamers('online', null, null, streamerData);
                  }
                }}
                hasMore={filter ? false : true}
                loader={
                  <div className="flex justify-center">
                    <LoadingIcon width="75px" height="75px" />
                  </div>
                }
              >
                {streamerData.map((streamer, index) => {
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
              </InfiniteScroll>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}
