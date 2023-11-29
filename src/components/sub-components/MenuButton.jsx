import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import useStream from '../../Context/useStream';

export default function MenuButtonX({ setShowModal }) {
  const navigate = useNavigate();
  const { loggedIn } = useStream();

  return (
    <Dropdown>
      <MenuButton>Menu</MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {loggedIn ? (
          <MenuItem onClick={() => navigate('/favorites')}>Favorites</MenuItem>
        ) : (
          <MenuItem onClick={() => setShowModal('sign-up')}>Sign Up</MenuItem>
        )}
        <MenuItem onClick={() => navigate('/all-games')}>All Games</MenuItem>
        <MenuItem onClick={() => navigate('/request')}>Add a Streamer</MenuItem>
        <MenuItem onClick={() => navigate('/about')}>About</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  z-index: 50;
  padding: 5px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  () => `
  font-family: logo, IBM Plex Sans, sans-serif;
  font-size: 0.875rem/* 14px */;
  line-height: 1.25rem/* 20px */;
  letter-spacing: .03rem;
  padding: 4px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
    --tw-gradient-from: #9499ff;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(148, 153, 255, 0));
    --tw-gradient-to: #98c1f7;
      transform: scale(var(--tw-transform-scale, 1));
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 250ms;

     &:hover {
    color: #ffffff;
    --tw-transform-scale: 1.05
  }
    @media (min-width: 769px) {
    display: none;
  }
  `,
);
