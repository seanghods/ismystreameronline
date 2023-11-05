import { NavLink } from 'react-router-dom';
import useStream from '../Context/useStream';

export default function NavBar() {
  const { gamesData } = useStream();
  return (
    <div className="nav-bar-section h-5/6 flex-col w-[300px] hidden lg:flex">
      <div className="nav-bar border-2 border-gray-300 flex-1 mx-3 md:mx-7 rounded-lg text-black shadow-xl shadow-[#106ae0] font-bold px-5 text-center overflow-y-auto">
        <div className="nav-bar-links mt-4 flex flex-col gap-10 items-center md:items-stretch ">
          {gamesData
            .filter(game => game.totalViewers > 0)
            .slice(0, 6)
            .map((game, index) => {
              return (
                <NavLink
                  to={'/game/' + game.slugName}
                  key={index}
                  className={({ isActive }) =>
                    [
                      'outline outline-1 rounded-lg p-1 outline-gray-200 transform transition duration-250 hover:scale-105 shadow-md shadow-black font-game tracking-tight hover:text-white hover:bg-gradient-to-r hover:from-[#acaffd] hover:to-[#b3d4ff]',
                      isActive ? 'bg-gray-200' : null,
                    ].join(' ')
                  }
                >
                  <div>{game.name}</div>
                  <div className="text-black tracking-wider">
                    {game.totalViewers.toLocaleString()}
                  </div>
                </NavLink>
              );
            })}
          <NavLink
            to={'/all-games/'}
            className="transform transition duration-250 hover:scale-105 font-game hover:font-bold p-5"
          >
            More Games
          </NavLink>
        </div>
      </div>
    </div>
  );
}
