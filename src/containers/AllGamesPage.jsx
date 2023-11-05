import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { LoadingIcon } from '../components/sub-components/Icons';
import { Transition } from '@headlessui/react';
import useStream from '../Context/useStream';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function AllGamesPage({ fetchMoreGames }) {
  const { gamesData, loading, setLoading } = useStream();
  useEffect(() => {
    setLoading(false);
  });
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
          <div className="streamer-list w-full flex flex-col gap-4 items-center">
            <h2 className="font-logo text-3xl mb-8">All Games</h2>
            <div className="labels flex font-logo w-4/5 md:w-1/3 text-center">
              <div className="pr-16 flex-1">
                <VideogameAssetIcon />
              </div>
              <div className="flex-1">
                <SportsEsportsIcon />
              </div>
              <div className="flex-1">
                <VisibilityIcon />
              </div>
            </div>
            <div className="w-full">
              <InfiniteScroll
                dataLength={gamesData.length}
                className="flex flex-col gap-3 items-center"
                next={() => {
                  fetchMoreGames(gamesData);
                }}
                hasMore={true}
                loader={
                  <div className="flex justify-center">
                    <LoadingIcon width="75px" height="75px" />
                  </div>
                }
              >
                {gamesData.map((game, index) => {
                  return (
                    <div
                      className="w-4/5 md:w-1/3 hover:cursor-pointer transform transition duration-250 hover:-translate-y-1 bg-white rounded-lg text-gray-800 shadow-md hover:bg-gray-300"
                      key={index}
                    >
                      <NavLink to={'/game/' + game.slugName} className="">
                        <div
                          className={`flex font-game font-bold text-md p-2 w-full text-center justify-center items-center hover:cursor-pointer rounded-lg)
                      `}
                        >
                          <div className="flex-1 flex px-3 md:pl-12 whitespace-nowrap overflow-ellipsis overflow-hidden">
                            {game.name}
                          </div>
                          <div className="w-[80px] flex items-center justify-center">
                            {game.totalStreamers}
                          </div>
                          <div className="flex-1">
                            {game.totalViewers.toLocaleString()}
                          </div>
                        </div>
                      </NavLink>
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
