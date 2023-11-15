import { NavLink, useNavigate } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';

export default function Header({
  setShowModal,
  loggedIn,
  setLoggedIn,
  lightMode,
  setLightMode,
}) {
  const navigate = useNavigate();
  async function handleLogOut() {
    const response = await fetch('/api/log-out');

    const data = await response.json();

    if (response.ok && data.success) {
      setLoggedIn(false);
      navigate('/');
    } else {
      console.log(data.message);
    }
  }
  return (
    <>
      <div className="flex h-[85px] p-5 justify-center xl:border-b-2 xl:border-gray-200">
        <div className="flex-1 text-center md:text-left">
          <NavLink to="/" className="md:p-12 font-logo text-sm md:text-2xl">
            Is My Streamer <br className="md:hidden" /> Online
          </NavLink>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="login-links flex gap-3 md:gap-6">
            <button className="shadow-md shadow-gray-400 md:hidden font-logo flex items-center justify-center rounded-md border tracking-wide border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105">
              <SearchIcon />
            </button>
            <input
              type="text"
              className="rounded-lg p-5 hidden md:block dark:bg-gray-300"
              placeholder="Search here"
              // onChange={handleChange}
              // value={searchInput}
            />
            {loggedIn ? (
              <>
                <NavLink
                  to="/favorites"
                  className="shadow-md shadow-gray-400 font-logo flex items-center justify-center rounded-md border tracking-wide border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105"
                >
                  Favorites
                </NavLink>
                <button
                  onClick={() => {
                    handleLogOut();
                  }}
                  className="shadow-md shadow-gray-400 font-logo flex items-center justify-center rounded-md border border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowModal('log-in');
                  }}
                  className="shadow-md shadow-gray-400 font-logo flex items-center justify-center rounded-md border border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setShowModal('sign-up');
                  }}
                  className="shadow-md shadow-gray-400 font-logo flex items-center justify-center rounded-md border border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105"
                >
                  Sign Up
                </button>
              </>
            )}
            <div className="move-right ml-78 items-center gap-3 hidden md:flex">
              {lightMode ? (
                <LightModeIcon color="" />
              ) : (
                <LightModeIcon color="disabled" />
              )}
              <Switch
                checked={lightMode}
                onChange={() => setLightMode(!lightMode)}
                className={`${lightMode ? 'bg-gray-700' : 'bg-gray-200'}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${lightMode ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
        </div>
        <div className="flex-1 justify-end hidden md:flex">
          {' '}
          <NavLink
            to="/request"
            className="shadow-md w-[200px] shadow-gray-400 font-logo rounded-md border tracking-wide border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105 flex justify-center items-center"
          >
            Request a Streamer
          </NavLink>
        </div>
      </div>
    </>
  );
}
