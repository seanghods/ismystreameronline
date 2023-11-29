import { Tooltip } from '@mui/material';
import { useState } from 'react';
import useStream from '../Context/useStream';
import { API_ROUTES } from '../utils/constants';

export default function RequestPage() {
  const [showRequestTooltip, setShowRequestTooltip] = useState(false);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const { loggedIn } = useStream();
  async function handleSubmit(e) {
    e.preventDefault();
    if (loggedIn) {
      const response = await fetch(API_ROUTES.request, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.username.value,
          platform: e.target.platform.value,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        e.target.username.value = '';
        setShowSubmitMessage(true);
        setTimeout(() => setShowSubmitMessage(false), 10000);
      }
    } else {
      setShowRequestTooltip(true);
      setTimeout(() => setShowRequestTooltip(false), 2000);
    }
  }
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="font-logo text-3xl mb-8">Request</h2>
        <div className="flex flex-col gap-8 items-center">
          <h3 className="font-gamebold px-4 md:px-0">
            Request a Streamer to be added to the platform
          </h3>
          <h3 className="font-game w-4/5 md:w-1/2 text-sm">
            The list of streamers included on this website is being added to
            across each streaming platform everyday.
          </h3>
          <h3 className="font-game w-4/5 md:w-1/2 text-sm">
            If you request a streamer, check back within a couple hours or the
            next day to find the streamer available to be liked.
          </h3>
        </div>
        <form
          className="flex flex-col w-full md:w-1/4 p-12 gap-3 font-game"
          id="request"
          onSubmit={handleSubmit}
        >
          <label htmlFor="platform">Platform</label>
          <select id="platform" className="dark:bg-gray-700 p-1 rounded-md">
            <option disabled selected>
              Select...
            </option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="Kick">Kick</option>
          </select>
          <label htmlFor="username">Username</label>
          <input
            className="dark:bg-gray-700 rounded-md p-1 mb-8"
            name="username"
            type="text"
            placeholder="user"
            minLength="3"
          />
          <div className="button text-center mt-5">
            {' '}
            <Tooltip
              title="Log in to request a streamer"
              placement="top-start"
              classes={{ tooltip: 'like-tooltip' }}
              arrow
              open={showRequestTooltip}
              disableHoverListener // This disables the hover behavior
            >
              <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2 ">
                Submit
              </button>
              <div className="message">
                {showSubmitMessage &&
                  'Success - Your streamer has been added to the database and will be available as soon as possible when they are live.'}
              </div>
            </Tooltip>
          </div>
        </form>
      </div>
    </>
  );
}
