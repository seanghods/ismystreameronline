import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LaptopIcon from '@mui/icons-material/Laptop';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TwitchIcon, YouTubeIcon, KickIcon } from './Icons';

export function StreamList({ streamerData, title, gameFilter }) {
  return (
    <>
      <div className="streamer-list flex flex-col gap-6 items-center">
        <h2 className="font-logo text-3xl mb-5">{title}</h2>
        <div className="flex font-logo w-4/5 text-center">
          <div className="flex-1">
            <PersonIcon />
          </div>
          <div className="flex-1">
            <VisibilityIcon />
          </div>
          <div className="flex-1">
            {' '}
            <SportsEsportsIcon />
          </div>
          <div className="flex-1">
            <LaptopIcon />
          </div>
          <div className="flex-1">
            <ArrowForwardIcon />
          </div>
        </div>
        {streamerData
          .filter(streamer => streamer.online === true)
          .map((streamer, index) => {
            if (gameFilter && streamer.game !== gameFilter) return null;
            return (
              <div
                key={index}
                className="flex font-logo w-4/5 p-2 text-center justify-center items-center hover:bg-[#abdbe3] hover:cursor-pointer rounded-lg"
              >
                <div className="flex-1">{streamer.name}</div>
                <div className="flex-1">
                  {streamer.viewers.toLocaleString()}
                </div>
                <div className="flex-1">{streamer.game}</div>
                <div className="flex-1 flex justify-center">
                  {streamer.platform == 'Twitch' ? (
                    <TwitchIcon />
                  ) : streamer.platform == 'YouTube' ? (
                    <YouTubeIcon />
                  ) : streamer.platform == 'Kick' ? (
                    <KickIcon />
                  ) : null}
                </div>
                <div className="flex-1">
                  <button className="bg-[#0FFF50] rounded-md px-5 py-2 shadow-md transform transition duration-250 hover:scale-105">
                    Online
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      ;
    </>
  );
}
