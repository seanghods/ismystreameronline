import { NavLink } from 'react-router-dom';
import useStream from '../Context/useStream';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function NavBar() {
  const { gamesData } = useStream();
  return (
    <div className="nav-bar-section h-full flex-col w-[200px] hidden lg:flex">
      <div className="nav-bar text-sm border-2 border-gray-300 w-full mx-3 md:mx-7 rounded-lg text-black shadow-xl shadow-[#89bcff] font-bold text-center overflow-y-auto sticky top-20">
        <div className="nav-bar-links flex flex-col items-center md:items-stretch ">
          {gamesData.slice(0, 6).map((game, index) => {
            return (
              <NavLink
                to={'/game/' + game.slugName}
                key={index}
                className={({ isActive }) =>
                  [
                    'outline outline-1 py-6 outline-gray-50 dark:outline-gray-600 p-1 transform transition duration-250 shadow-md shadow-black font-gamebold tracking-tight hover:text-white hover:bg-gradient-to-r hover:from-[#acaffd] hover:to-[#7bb4ff]',
                    isActive ? 'bg-gray-200 dark:bg-gray-700' : null,
                  ].join(' ')
                }
              >
                <div>{game.name}</div>
                <div className="text-black dark:text-white tracking-wider font-game">
                  <span className="w-[5px]">
                    <VisibilityIcon fontSize="small" />
                  </span>{' '}
                  {game.totalViewers.toLocaleString()}
                </div>
              </NavLink>
            );
          })}
          <NavLink
            to={'/all-games/'}
            className="hover:bg-gradient-to-r hover:from-[#acaffd] hover:to-[#7bb4ff] transform transition duration-250 font-game hover:font-bold p-5"
          >
            More Games
          </NavLink>
        </div>
      </div>
    </div>
  );
}
