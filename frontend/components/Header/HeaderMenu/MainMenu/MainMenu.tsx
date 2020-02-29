import React from 'react';
import ActiveLink from '../../../UiElements/NavLink/NavLink';
import Menu, { MenuItem, MenuLink } from './MainMenu.styled';

const menuItems = [
  {
    id: 1,
    label: 'Overview',
    path: '/',
  },
  {
    id: 2,
    label: 'Apps',
    path: '/apps',
  },
  {
    id: 3,
    label: 'Shop',
    path: '/shop',
  },
  // {
  //   id: 4,
  //   label: 'Integrations',
  //   path: '/integrations',
  // },
  {
    id: 4,
    label: 'Charts',
    path: '/charts',
  },
  {
    id: 5,
    label: 'Forms',
    path: '/forms',
  },
  {
    id: 6,
    label: 'UI Elements',
    path: '/uielements',
  },
  {
    id: 7,
    label: 'Pricing',
    path: '/pricing',
  },
  {
    id: 8,
    label: 'Profile',
    path: '/profile',
  },
  {
    id: 9,
    label: 'Settings',
    path: '/settings',
  },
];

type MenuProps = {
  className?: string;
  onClick?: () => void;
};

const MainMenu = ({ className, onClick }: MenuProps) => {
  return (
    <Menu className={className}>
      {menuItems.map(item => (
        <MenuItem key={`top-menu--item${item.id}`} onClick={onClick}>
          <ActiveLink activeClassName="active" href={item.path}>
            <MenuLink>{item.label}</MenuLink>
          </ActiveLink>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MainMenu;
