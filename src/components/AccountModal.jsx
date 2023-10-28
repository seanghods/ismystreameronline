import { useEffect, useRef } from 'react';

export default function LoginModal({ showModal, setShowModal, setLoggedIn }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal('');
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setShowModal]);

  async function handleSignUp(e) {
    e.preventDefault();

    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setShowModal('log-in');
    } else {
      console.log(data.message);
    }
  }

  async function handleLogIn(e) {
    e.preventDefault();

    const response = await fetch('/api/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setLoggedIn(true);
      setShowModal('');
    } else {
      console.log(data.message);
    }
  }
  return (
    <>
      <div
        ref={modalRef}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 bg-gray-200 border-2 border-black shadow-xl shadow-[#106ae0] rounded-lg w-[350px] h-[450px]"
      >
        {showModal == 'log-in' ? (
          <LogInForm handleLogIn={handleLogIn} />
        ) : showModal == 'sign-up' ? (
          <SignUpForm handleSignUp={handleSignUp} />
        ) : null}
      </div>
    </>
  );
}

function LogInForm({ handleLogIn }) {
  return (
    <>
      <h2 className="text-center font-game pt-10 text-2xl">Log In</h2>
      <form
        className="flex flex-col p-12 gap-2 font-game"
        id="log-in"
        onSubmit={handleLogIn}
      >
        <label htmlFor="username">Username</label>
        <input
          className="bg-white rounded-md p-1"
          name="username"
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          className="bg-white rounded-md p-1"
          name="password"
          type="password"
        />
        <div className="button text-center mt-5">
          {' '}
          <button className="bg-white rounded-lg w-1/2 text-center px-3 py-2 hover:bg-gray-300">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

function SignUpForm({ handleSignUp }) {
  return (
    <>
      <h2 className="text-center font-game pt-10 text-2xl">Sign Up</h2>
      <form
        className="flex flex-col p-12 gap-2 font-game"
        id="sign-up"
        onSubmit={handleSignUp}
      >
        <label htmlFor="username">Username</label>
        <input className="white rounded-md p-1" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input
          className="bg-white rounded-md p-1"
          name="password"
          type="password"
        />
        <label htmlFor="email">Email</label>
        <input className="bg-white rounded-md p-1" name="email" type="email" />
        <div className="button text-center mt-5">
          {' '}
          <button className="bg-white rounded-lg w-1/2 text-center px-3 py-2 hover:bg-gray-300">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
