import { NavLink } from 'react-router-dom';
import useStream from '../Context/useStream';

export default function NavBar() {
  const { gamesData } = useStream();
  return (
    <div className="nav-bar-section h-screen flex flex-col w-[100px] md:w-[350px] sticky top-0">
      <div className="nav-bar flex-1 m-3 md:m-7 rounded-lg text-black shadow-xl shadow-[#106ae0] font-bold px-5 py-10 text-center bg-gradient-to-r from-[#9499ff] to-[#98c1f7] overflow-y-auto">
        <NavLink to="/" className="font-logo text-lg">
          Is My Streamer Online
        </NavLink>
        <div className="nav-bar-links mt-24 flex flex-col gap-20 items-center md:items-stretch ">
          {gamesData
            .filter(game => game.totalViewers > 0)
            .map((game, index) => {
              return (
                <NavLink
                  to={'/game/' + game.slugName}
                  key={index}
                  className={({ isActive }) =>
                    [
                      'outline outline-1 rounded-lg p-3 outline-gray-200 transform transition duration-250 hover:scale-105 shadow-lg shadow-black font-game tracking-tight hover:text-white hover:bg-gradient-to-r hover:from-[#acaffd] hover:to-[#b3d4ff]',
                      isActive ? 'text-white' : null,
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
        </div>
      </div>
    </div>
  );
}
