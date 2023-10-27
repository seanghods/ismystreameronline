import { NavLink } from 'react-router-dom';

export default function NavBar({ gamesData }) {
  return (
    <div className="nav-bar-section h-screen flex flex-col w-[100px] md:w-[350px] sticky top-0">
      <div className="nav-bar flex-1 m-3 md:m-7 bg-gray-150 rounded-lg text-white bg-[#20639B] shadow-xl shadow-[#106ae0] px-5 py-10 text-center">
        <NavLink to="/" className="font-logo text-lg">
          Is My Streamer Online
        </NavLink>
        <div className="nav-bar-links mt-24 flex flex-col gap-20 items-center md:items-stretch ">
          {gamesData
            .sort((a, b) => b.totalViewers - a.totalViewers)
            .map((game, index) => {
              return (
                <NavLink
                  to={'/game/' + game.slugName}
                  key={index}
                  className={({ isActive }) =>
                    [
                      'font-game hover:text-[#3CAEA3]',
                      isActive ? 'text-gray-300' : null,
                    ].join(' ')
                  }
                >
                  <div>{game.name}</div>
                  <div className="text-gray-300 tracking-wider">
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
