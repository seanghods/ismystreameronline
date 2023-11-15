// import { useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function LoginModal({ showModal, setShowModal, setLoggedIn }) {
  const [error, setError] = useState();
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
      setLoggedIn(true);
      setShowModal('');
      setError('');
    } else {
      setError('sign-up');
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
      setError('');
    } else {
      setError('log-in');
    }
  }
  return (
    <>
      {showModal == 'log-in' ? (
        <LogInForm
          handleLogIn={handleLogIn}
          setShowModal={setShowModal}
          error={error}
          setError={setError}
        />
      ) : showModal == 'sign-up' ? (
        <SignUpForm
          handleSignUp={handleSignUp}
          setShowModal={setShowModal}
          error={error}
          setError={setError}
        />
      ) : null}
    </>
  );
}

function LogInForm({ handleLogIn, setShowModal, error, setError }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setShowModal('');
          setError('');
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 flex justify-center items-center border-b-2 pb-3 dark:text-white"
                >
                  Log In
                  {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setShowModal('');
                      setError('');
                    }}
                  >
                    Close
                  </button> */}
                </Dialog.Title>
                <div className="mt-4 flex justify-end"></div>

                <form
                  className="flex flex-col p-12 gap-2 font-game"
                  id="log-in"
                  onSubmit={handleLogIn}
                >
                  <label htmlFor="username">Username</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 font-gamebold outline outline-1 rounded-md p-1 "
                    name="username"
                    type="text"
                    placeholder="user"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 font-gamebold outline outline-1 rounded-md p-1"
                    name="password"
                    type="password"
                    placeholder="***"
                  />
                  <div className="button text-center mt-5">
                    {' '}
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2 ">
                      Log In
                    </button>
                    {error == 'log-in' ? (
                      <div className="font-game font-bold text-red-600 pt-5">
                        Error logging in <br /> Incorrect Credentials
                      </div>
                    ) : null}
                  </div>
                </form>
                <div className="button text-center m-2 font-game flex justify-center">
                  <button
                    className="inline-flex dark:bg-gray-300 font-gamebold justify-center rounded-md border border-transparent bg-white px-3 py-1 text-sm text-indigo-600 font-bold hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={e => {
                      e.stopPropagation();
                      setShowModal('sign-up');
                      setError('');
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function SignUpForm({ handleSignUp, setShowModal, error, setError }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setShowModal('');
          setError('');
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg dark:text-white font-bold leading-6 text-gray-900 flex justify-center items-center border-b-2 pb-3"
                >
                  Sign Up
                  {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setShowModal('');
                      setError('');
                    }}
                  >
                    Close
                  </button> */}
                </Dialog.Title>
                <div className="mt-4 flex justify-end"></div>
                <form
                  className="flex flex-col p-12 gap-2 font-game"
                  id="sign-up"
                  onSubmit={handleSignUp}
                >
                  <label htmlFor="username">Username*</label>
                  <input
                    className="bg-gray-100 font-gamebold dark:bg-gray-400  outline-1 outline rounded-md p-1"
                    name="username"
                    type="text"
                    placeholder="user"
                  />
                  <label htmlFor="password">Password*</label>
                  <input
                    className="bg-gray-100 font-gamebold dark:bg-gray-400 outline-1 outline rounded-md p-1"
                    name="password"
                    type="password"
                    placeholder="***"
                  />
                  <label htmlFor="email">Email*</label>
                  <input
                    className="bg-gray-100 font-gamebold dark:bg-gray-400 outline-1 outline rounded-md p-1"
                    name="email"
                    type="email"
                    placeholder="user@gmail.com"
                  />
                  <div className="button text-center mt-5">
                    {' '}
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2">
                      Sign Up
                    </button>
                    {error == 'sign-up' ? (
                      <div className="font-game font-bold text-red-600 pt-5">
                        Error Signing Up
                      </div>
                    ) : null}
                  </div>
                </form>
                <div className="button text-center m-2 font-game flex justify-center">
                  <button
                    className="inline-flex dark:bg-gray-300 font-gamebold justify-center rounded-md border border-transparent bg-white px-3 py-1 text-sm text-indigo-600 font-bold hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={e => {
                      e.stopPropagation();
                      setShowModal('log-in');
                      setError('');
                    }}
                  >
                    Log In
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
