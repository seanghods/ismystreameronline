import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import Search from './sub-components/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import { API_ROUTES } from '../utils/constants';

export default function Header({
  setShowModal,
  loggedIn,
  setLoggedIn,
  lightMode,
  setLightMode,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  function hideOnMobile() {
    if (location.pathname == '/request') {
      return 'hidden md:flex';
    }
  }
  async function handleLogOut() {
    const response = await fetch(API_ROUTES.logOut);

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
      <div className="flex h-[85px] p-5 justify-center">
        <div className="flex-1 text-center md:text-left">
          <NavLink to="/" className="md:p-12 font-logo text-sm md:text-2xl">
            Is My Streamer <br className="md:hidden" /> Online
          </NavLink>
        </div>
        {/* <div className="flex-1"></div> */}
        <div className="flex-1 flex justify-end">
          <div className="login-links flex gap-3 md:gap-6">
            {/* <button
              onClick={() => (
                <div>
                  <Search />
                </div>
              )}
              className="shadow-md shadow-gray-400 md:hidden font-logo flex items-center justify-center rounded-md border tracking-wide border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105"
            >
              <SearchIcon />
            </button> */}
            <Search />
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
            <div className="move-right ml-78 items-center gap-3 hidden">
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
        <div className="pr-4 pb-3 md:pb-0 flex flex-1 justify-end fixed z-50 bottom-0 right-0 md:relative md:bottom-0 md:right-0 md:flex">
          {' '}
          <NavLink
            to="/request"
            className={`shadow-md w-[150px] md:w-[150px] shadow-gray-400 font-logo rounded-md border tracking-wide border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105 flex justify-center items-center ${hideOnMobile()}`}
          >
            Add a Streamer
          </NavLink>
        </div>
        <div className="justify-end hidden md:relative md:flex">
          <NavLink
            to="/about"
            className="shadow-md shadow-gray-400 font-logo rounded-md border tracking-wide border-transparent px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#9499ff] to-[#98c1f7] hover:text-white transform transition duration-250 hover:scale-105 flex justify-center items-center"
          >
            About
          </NavLink>
        </div>
      </div>
    </>
  );
}
