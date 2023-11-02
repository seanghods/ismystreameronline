import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import LaptopIcon from '@mui/icons-material/Laptop';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoadingIcon } from './sub-components/Icons';
import { Transition } from '@headlessui/react';
import StreamerItem from './StreamerItem';
import useStream from '../Context/useStream';

export function StreamList({ title, filter }) {
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
            <div className="labels flex font-logo w-2/3 text-center">
              <div className="w-6"></div>
              <div className="w-1/5">
                <PersonIcon />
              </div>
              <div className="w-[80px]">
                <VisibilityIcon />
              </div>
              <div className="w-1/4">
                {' '}
                <SportsEsportsIcon />
              </div>
              <div className="flex-1">
                <ChatIcon />
              </div>
              <div className="w-[130px]">
                <LaptopIcon />
              </div>
              <div className="w-[100px] pr-4">
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
                <div
                  className="w-2/3 hover:cursor-pointer transform transition duration-250 hover:-translate-y-1 bg-white rounded-lg text-gray-800 shadow-md"
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
          </div>
        )}
      </Transition>
    </>
  );
}
