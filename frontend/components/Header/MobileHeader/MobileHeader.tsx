import React, { useState } from 'react';
import { FiMenu, FiMoreHorizontal } from 'react-icons/fi';
import Sticky from 'react-stickynode';
import { useRouter } from 'next/router';
import { Button } from 'baseui/button';
import { Drawer } from 'baseui/drawer';
import { Block } from 'baseui/block';
import Badge from '../../UiElements/Badge/Badge';
import Logo from '../../UiElements/Logo/Logo';
import SvgIcon from '../../UiElements/SvgIcon/SvgIcon';
import TopMenu from '../HeaderMenu/TopMenu/TopMenu';
import MainMenu from '../HeaderMenu/MainMenu/MainMenu';
import AvatarMenu from '../HeaderMenu/AvatarMenu/AvatarMenu';
import {
  useThemeSwitcherCtx,
  THEME,
} from '../../../contexts/theme/theme.provider';
import HeaderWrapper, {
  PageTitle,
  TopMenuWrapper,
} from './MobileHeader.styled';

const MobileHeader: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState('main');
  const { pathname } = useRouter();
  const { theme } = useThemeSwitcherCtx();

  let pageName: React.ReactNode = pathname.split('/').slice(1, 2);
  let titleColor = '#000000';
  if (theme === THEME.dark) {
    titleColor = '#ffffff';
  }

  pageName =
    pathname !== '/' && pathname !== '/_error' ? (
      <PageTitle $style={{ color: titleColor }}>{pageName}</PageTitle>
    ) : (
      <Logo
        style={{ marginTop: '3px' }}
        path="/"
        src={
          <SvgIcon src={require('../../../assets/images/logo.svg?include')} />
        }
      />
    );

  let placement;
  if (menu === 'main') {
    placement = 'left';
  }
  if (menu === 'top') {
    placement = 'right';
  }

  return (
    <Sticky>
      <HeaderWrapper className="mobile">
        <Button
          onClick={() => {
            setIsOpen(true);
            setMenu('main');
          }}
          kind="minimal"
          size="compact"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => {
                return {
                  fontSize: '22px',
                  width: '104px',
                  justifyContent: 'flex-start',
                  ':hover': {
                    backgroundColor: $theme.colors.primaryB,
                  },
                  ':focus': {
                    backgroundColor: $theme.colors.primaryB,
                  },
                };
              },
            },
          }}
        >
          <FiMenu />
        </Button>

        {pageName}

        <Block
          overrides={{
            Block: { style: { display: 'flex', alignItems: 'center' } },
          }}
        >
          <Badge
            path="/shop/checkout"
            icon={
              <SvgIcon
                src={require('../../../assets/images/cart-bag.svg?include')}
              />
            }
            count={10}
            style={{ margin: '0 20px' }}
            onClick={() => setIsOpen(false)}
          />

          <Button
            onClick={() => {
              setIsOpen(true);
              setMenu('top');
            }}
            kind="minimal"
            size="compact"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    fontSize: '24px',
                    ':hover': {
                      backgroundColor: $theme.colors.primaryB,
                    },
                    ':focus': {
                      backgroundColor: $theme.colors.primaryB,
                    },
                  };
                },
              },
            }}
          >
            <FiMoreHorizontal />
          </Button>
        </Block>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          anchor={placement}
          size="full"
          overrides={{
            Root: {
              style: () => {
                return { zIndex: 9999 };
              },
            },

            Close: {
              style: {
                width: '30px',
                height: '30px',
                ':focus': {
                  borderColor: 'transparent',
                },
              },
            },
          }}
        >
          {menu === 'main' && (
            <MainMenu
              className="mobile-menu"
              onClick={() => setIsOpen(false)}
            />
          )}

          {menu === 'top' && (
            <TopMenuWrapper>
              <TopMenu onClick={() => setIsOpen(false)} />

              <AvatarMenu
                showOnlyMenu={true}
                onClick={() => setIsOpen(false)}
              />
            </TopMenuWrapper>
          )}
        </Drawer>
      </HeaderWrapper>
    </Sticky>
  );
};

export default MobileHeader;
