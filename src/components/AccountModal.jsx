// import { useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import { NavLink } from 'react-router-dom';
import { GoogleIcon, TwitchIcon } from './sub-components/Icons';

export default function LoginModal({ showModal, setShowModal, setLoggedIn }) {
  const [formErrors, setFormErrors] = useState({
    signUp: {},
    logIn: {},
  });
  async function handleSignUp(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      const newErrors = {
        signUp: { username: '', password: '', email: '', message: '' },
        logIn: {},
      };
      if (!form['username'].checkValidity()) {
        newErrors.signUp.username = 'Username must be at least 3 characters';
      }
      if (!form['password'].checkValidity()) {
        newErrors.signUp.password = 'Password must be at least 6 characters';
      }
      if (!form['email'].checkValidity()) {
        newErrors.signUp.email = 'Email is invalid';
      }
      setFormErrors(newErrors);
    } else {
      const response = await fetch(API_ROUTES.signUp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username.value,
          password: form.password.value,
          email: form.email.value,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoggedIn(true);
        setShowModal('');
      } else {
        const newErrors = {
          signUp: {
            username: '',
            password: '',
            email: '',
            message: data.message,
          },
          logIn: {},
        };
        setFormErrors(newErrors);
      }
    }
  }

  async function handleLogIn(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      const newErrors = {
        logIn: { username: '', password: '', message: '' },
        signUp: {},
      };
      if (!form['username'].checkValidity()) {
        newErrors.logIn.username = 'Username is required';
      }
      if (!form['password'].checkValidity()) {
        newErrors.logIn.password = 'Password is required';
      }
      setFormErrors(newErrors);
    } else {
      const response = await fetch(API_ROUTES.logIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({
          username: form.username.value,
          password: form.password.value,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoggedIn(true);
        setShowModal('');
      } else {
        const newErrors = {
          logIn: {
            username: '',
            password: '',
            message: 'Incorrect Username / Password',
          },
          signUp: {},
        };
        setFormErrors(newErrors);
      }
    }
  }
  return (
    <>
      {showModal == 'log-in' ? (
        <LogInForm
          handleLogIn={handleLogIn}
          setShowModal={setShowModal}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      ) : showModal == 'sign-up' ? (
        <SignUpForm
          handleSignUp={handleSignUp}
          setShowModal={setShowModal}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      ) : null}
    </>
  );
}

function LogInForm({ handleLogIn, setShowModal, formErrors, setFormErrors }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setShowModal('');
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
                </Dialog.Title>
                {OAuthLogin()}
                <div className="mt-4 flex justify-end"></div>

                <form
                  className="flex flex-col p-12 pt-0 gap-2 font-gamebold"
                  id="log-in"
                  noValidate
                  onSubmit={handleLogIn}
                >
                  <label htmlFor="username">Username / Email</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 font-gamebold outline outline-1 rounded-md p-1 "
                    name="username"
                    type="text"
                    placeholder="user"
                    required
                  />
                  {formErrors.logIn.username && (
                    <div className="error-message">
                      {formErrors.logIn.username}
                    </div>
                  )}
                  <label htmlFor="password">Password</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 font-gamebold outline outline-1 rounded-md p-1"
                    name="password"
                    type="password"
                    placeholder="***"
                    required
                  />
                  {formErrors.logIn.password && (
                    <div className="error-message">
                      {formErrors.logIn.password}
                    </div>
                  )}
                  <div className="button text-center mt-5">
                    {' '}
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2 ">
                      Log In
                    </button>
                  </div>
                  {formErrors.logIn.message && (
                    <div className="error-message w-full text-center font-gamebold text-red-600 dark:text-red-200 mt-2">
                      {formErrors.logIn.message}
                    </div>
                  )}
                </form>
                <div className="button text-center m-2 font-game flex justify-center">
                  <button
                    className="inline-flex bg-gray-200 dark:bg-gray-600 font-gamebold justify-center rounded-md border border-transparent px-3 py-1 text-sm text-indigo-600 font-bold hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={e => {
                      e.stopPropagation();
                      setFormErrors({
                        signUp: {},
                        logIn: {},
                      });
                      setShowModal('sign-up');
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    className="inline-flex mt-1 justify-self-end rounded-md border border-transparent bg-gray-200 dark:bg-gray-600 px-2 py-1 font-gamebold text-sm font-medium text-black hover:bg-gray-400"
                    onClick={() => {
                      setShowModal('');
                    }}
                  >
                    Close
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

function SignUpForm({ handleSignUp, setShowModal, formErrors, setFormErrors }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setShowModal('');
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
                </Dialog.Title>
                {OAuthSignUp()}
                <form
                  className="flex flex-col px-4 pb-3 md:px-12 md:pb-3 gap-2 font-gamebold"
                  noValidate
                  id="sign-up"
                  onSubmit={handleSignUp}
                >
                  <label htmlFor="username">Username*</label>
                  <input
                    className="bg-gray-100 font-gamebold dark:bg-gray-400  outline-1 outline rounded-md p-1"
                    name="username"
                    type="text"
                    placeholder="user"
                    required
                    minLength="3"
                  />
                  {formErrors.signUp.username && (
                    <div className="error-message">
                      {formErrors.signUp.username}
                    </div>
                  )}
                  <label htmlFor="password">Password*</label>
                  <input
                    className="bg-gray-100 font-gamebold dark:bg-gray-400 outline-1 outline rounded-md p-1"
                    name="password"
                    type="password"
                    placeholder="***"
                    required
                    minLength="6"
                  />
                  {formErrors.signUp.password && (
                    <div className="error-message">
                      {formErrors.signUp.password}
                    </div>
                  )}
                  <label htmlFor="email">Email*</label>
                  <input
                    className="bg-gray-100 font-gamebold dark:bg-gray-400 outline-1 outline rounded-md p-1"
                    name="email"
                    type="email"
                    required
                    placeholder="user@gmail.com"
                  />
                  {formErrors.signUp.email && (
                    <div className="error-message">
                      {formErrors.signUp.email}
                    </div>
                  )}
                  <div className="button text-center mt-5">
                    {' '}
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2">
                      Sign Up
                    </button>
                    {formErrors.signUp.message && (
                      <div className="error-message w-full text-center font-gamebold text-red-600 dark:text-red-200 mt-2">
                        {formErrors.signUp.message}
                      </div>
                    )}
                    <div className="reg-msg font-game text-xs mt-6 ">
                      *By registering I agree to the{' '}
                      <NavLink
                        to="/terms-of-service"
                        onClick={() => setShowModal('')}
                        className="text-blue-700 dark:text-blue-300 w-4/5 md:w-1/2"
                      >
                        Terms of Service
                      </NavLink>{' '}
                      and{' '}
                      <NavLink
                        to="/privacy-policy"
                        onClick={() => setShowModal('')}
                        className="text-blue-700 dark:text-blue-300 w-4/5 md:w-1/2 text-right"
                      >
                        Privacy Policy
                      </NavLink>
                      ”
                    </div>
                    <div className="pw-msg font-game text-xs mt-2 ">
                      Your privacy and security are important to us. We use
                      industry-standard security measures to protect your
                      personal information, including secure handling of
                      passwords.
                    </div>
                  </div>
                </form>
                <div className="button text-center m-2 font-game flex justify-center">
                  <button
                    className="inline-flex dark:bg-gray-600 font-gamebold justify-center rounded-md border border-transparent bg-gray-200 px-3 py-1 text-sm text-indigo-600 font-bold hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={e => {
                      e.stopPropagation();
                      setFormErrors({
                        signUp: {},
                        logIn: {},
                      });
                      setShowModal('log-in');
                    }}
                  >
                    Log In
                  </button>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    className="inline-flex mt-1 justify-self-end rounded-md border border-transparent bg-gray-200 dark:bg-gray-600 px-2 py-1 font-gamebold text-sm font-medium text-black hover:bg-gray-400"
                    onClick={() => {
                      setShowModal('');
                    }}
                  >
                    Close
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

function OAuthLogin() {
  function handleGoogleLogIn() {
    const url =
      import.meta.env.MODE === 'production'
        ? 'https://api.ismystreameronline.com/auth/google'
        : 'http://localhost:8000/auth/google';
    window.location.href = url;
  }
  function handleTwitchLogIn() {
    const url =
      import.meta.env.MODE === 'production'
        ? 'https://api.ismystreameronline.com/auth/twitch'
        : 'http://localhost:8000/auth/twitch';
    window.location.href = url;
  }
  return (
    <>
      <div className="mt-5 w-full flex flex-col justify-center items-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 font-gamebold rounded-lg mb-5 flex w-3/4 items-center justify-center space-x-2 p-1 font-bold"
          onClick={() => handleGoogleLogIn()}
        >
          <div className="base-icon w-[16px] h-[16px]">
            <GoogleIcon />
          </div>
          <span>Log In with Google</span>
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 font-gamebold rounded-lg mb-5 flex w-3/4 items-center justify-center space-x-1 p-1 font-bold"
          onClick={() => handleTwitchLogIn()}
        >
          <div className="base-icon w-[20px] h-[20px] flex items-center justify-center mr-1">
            <TwitchIcon />
          </div>
          <span>Log In with Twitch</span>
        </button>
      </div>
      <div className="my-5 flex w-full items-center justify-between space-x-3.5">
        <div className="h-[1px] grow bg-gray-200"></div>
        <div className="shrink-0 font-medium uppercase text-gray-400">Or</div>
        <div className="h-[1px] grow bg-gray-200"></div>
      </div>
      <div className="mt-4 flex justify-end"></div>
    </>
  );
}

function OAuthSignUp() {
  function handleGoogleSignUp() {
    const url =
      import.meta.env.MODE === 'production'
        ? 'https://api.ismystreameronline.com/auth/google'
        : 'http://localhost:8000/auth/google';
    window.location.href = url;
  }
  function handleTwitchLogIn() {
    const url =
      import.meta.env.MODE === 'production'
        ? 'https://api.ismystreameronline.com/auth/twitch'
        : 'http://localhost:8000/auth/twitch';
    window.location.href = url;
  }
  return (
    <>
      <div className="mt-5 w-full flex flex-col justify-center items-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 font-gamebold rounded-lg mb-5 flex w-3/4 items-center justify-center space-x-2 p-1 font-bold"
          onClick={() => handleGoogleSignUp()}
        >
          <div className="base-icon w-[16px] h-[16px]">
            <GoogleIcon />
          </div>
          <span>Sign up with Google</span>
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 font-gamebold rounded-lg mb-5 flex w-3/4 items-center justify-center space-x-1 p-1 font-bold"
          onClick={() => handleTwitchLogIn()}
        >
          <div className="base-icon w-[20px] h-[20px] flex items-center justify-center mr-1">
            <TwitchIcon />
          </div>
          <span>Sign up with Twitch</span>
        </button>
      </div>
      <div className="my-5 flex w-full items-center justify-between space-x-3.5">
        <div className="h-[1px] grow bg-gray-200"></div>
        <div className="shrink-0 font-medium uppercase text-gray-400">Or</div>
        <div className="h-[1px] grow bg-gray-200"></div>
      </div>
      <div className="mt-4 flex justify-end"></div>
    </>
  );
}
