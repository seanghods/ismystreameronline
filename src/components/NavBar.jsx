import { NavLink } from 'react-router-dom';
import slugify from 'slugify';

export default function NavBar({ gamesData, setFilter }) {
  return (
    <div className="nav-bar-section h-screen flex flex-col w-[100px] md:w-[350px] sticky top-0">
      <div className="nav-bar flex-1 m-3 md:m-7 bg-gray-150 rounded-lg text-white bg-[#20639B] shadow-xl shadow-[#106ae0] px-5 py-10 text-center">
        <NavLink to="/" className="font-logo text-lg">
          Is My Streamer Online
        </NavLink>
        <div className="nav-bar-links mt-24 flex flex-col gap-20 items-center md:items-stretch ">
          {gamesData.map((game, index) => {
            return (
              <NavLink
                to={
                  '/game/' + slugify(game.name, { lower: true, strict: true })
                }
                onClick={() => setFilter(game.name)}
                key={index}
                className={({ isActive }) =>
                  [
                    'font-game hover:text-[#3CAEA3]',
                    isActive ? 'text-gray-300' : null,
                  ].join(' ')
                }
              >
                {game.name} -{' '}
                <span className="text-gray-300">
                  {game.totalViewers.toLocaleString()}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
