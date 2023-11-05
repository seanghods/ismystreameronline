import './icon-css.css';

export function TwitchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="purple"
      className="bi bi-twitch"
      viewBox="0 0 16 16"
    >
      <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
      <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="red"
      className="bi bi-youtube"
      viewBox="0 0 16 16"
    >
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
    </svg>
  );
}

export function KickIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0h100v66.667h33.333V33.333h33.334V0h100v100h-33.334v33.333H200v33.334h33.333V200h33.334v100h-100v-33.333h-33.334v-33.334H100V300H0V0Z"
        fill="#53FC18"
      />
    </svg>
  );
}

export function LoadingIcon({ width = '200px', height = '200px' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9166666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(30 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8333333333333334s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(60 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5833333333333334s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(150 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4166666666666667s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(210 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.16666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(300 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.08333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(330 50 50)">
        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#226cdb">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
    </svg>
  );
}

export function PulseIcon({ status }) {
  return (
    <div className="flex flex-col justify-center items-end w-[40px] md:w-[140px] h-[30px]">
      <svg className="w-5/6 h-5/6" viewBox="0 0 400 400">
        <g transform="translate(200,200)">
          <circle
            className={status == 'online' ? 'core' : 'core-off'}
            cx="0"
            cy="0"
            r="32"
          ></circle>
          <circle
            className={status == 'online' ? 'radar' : 'radar-off'}
            cx="0"
            cy="0"
            r="32"
          ></circle>
        </g>
      </svg>
    </div>
  );
}
