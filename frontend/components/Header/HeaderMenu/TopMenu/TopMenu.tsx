import React from 'react';
import Menu, { MenuItem, MenuLink } from './TopMenu.style';

const menuItems = [
  {
    id: 1,
    label: 'Blog',
    path: '#',
  },
  {
    id: 2,
    label: 'Privacy',
    path: '/privacy',
  },
  {
    id: 3,
    label: 'Terms',
    path: '/terms',
  },
];

type MenuProps = {
  className?: string;
  onClick?: () => void;
};

const TopMenu = ({ className, onClick }: MenuProps) => {
  return (
    <Menu className={className}>
      {menuItems.map(item => (
        <MenuItem key={`top-menu--item${item.id}`} onClick={onClick}>
          <MenuLink href={item.path}>{item.label}</MenuLink>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TopMenu;
