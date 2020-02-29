import React from 'react';
import { withRouter } from 'next/router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AuthHeader from '../Header/AuthHeader/AuthHeader';
import AppWrapper, { ContentWrapper } from './Layout.styled';
import {
  useThemeSwitcherCtx,
  THEME,
} from '../../contexts/theme/theme.provider';

const Layout: React.FunctionComponent<{ router?: any }> = ({
  router,
  children,
}) => {
  const pathname = router.pathname;
  const { theme } = useThemeSwitcherCtx();
  let layoutBg = '#ffffff';

  if (theme === THEME.dark) {
    layoutBg = '#000000';
  }

  if (theme === THEME.light && pathname === '/') {
    layoutBg = '#fcfcfc';
  }

  if (theme === THEME.dark && pathname === '/') {
    layoutBg = '#0c0c0c';
  }

  return (
    <AppWrapper className={theme} style={{ backgroundColor: layoutBg }}>
      {pathname === '/login' || pathname === '/signup' ? (
        <AuthHeader pathname={pathname} />
      ) : (
        <Header />
      )}

      <ContentWrapper>{children}</ContentWrapper>

      {pathname === '/login' || pathname === '/signup' ? '' : <Footer />}
    </AppWrapper>
  );
};

export default withRouter(Layout);
