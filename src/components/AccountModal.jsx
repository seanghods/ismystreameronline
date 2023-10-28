import { useEffect, useRef } from 'react';

export default function LoginModal({ showModal, setShowModal }) {
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

  return (
    <>
      <div
        ref={modalRef}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 bg-gray-200 border-2 border-black shadow-xl shadow-[#106ae0] rounded-lg w-[350px] h-[450px]"
      >
        {showModal == 'log-in' ? (
          <LogInForm />
        ) : showModal == 'sign-up' ? (
          <SignUpForm />
        ) : null}
      </div>
    </>
  );
}

function LogInForm() {
  return (
    <>
      <h2 className="text-center font-game pt-10 text-2xl">Log In</h2>
      <form
        className="flex flex-col p-12 gap-2 font-game"
        action="/log-in"
        method="POST"
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

function SignUpForm() {
  return (
    <>
      <h2 className="text-center font-game pt-10 text-2xl">Sign Up</h2>
      <form
        className="flex flex-col p-12 gap-2 font-game"
        action="/sign-up"
        method="POST"
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
