import { NavLink, useNavigate } from 'react-router-dom';

export default function Header({ setShowModal, loggedIn, setLoggedIn }) {
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
      <div className="flex h-20 w-full p-5 justify-center mb-10">
        <div className="login-links flex gap-10">
          <input
            type="text"
            className="rounded-lg p-5"
            placeholder="Search here"
            // onChange={handleChange}
            // value={searchInput}
          />
          {loggedIn ? (
            <>
              <NavLink to="/favorites" className="font-logo flex items-center">
                Favorites
              </NavLink>
              <button
                onClick={() => {
                  handleLogOut();
                }}
                className="font-logo"
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
                className="font-logo"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setShowModal('sign-up');
                }}
                className="font-logo"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// <>
//   <div className="flex top-0 left-0 h-5p w-screen p-12 justify-between">
//     <button className="font-logo">Is My Streamer Online</button>
//     <div className="login-links flex gap-10">
//       <button className="font-logo">Log In</button>
//       <button className="font-logo">Sign Up</button>
//     </div>
//   </div>
// </>;
