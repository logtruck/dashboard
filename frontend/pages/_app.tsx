import React from "react";
import { NextPage } from "next";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme, DarkTheme } from "baseui";
import { styletron, debug } from "../styletron";
import Layout from "../components/Layout/Layout";
import { ThemeSwitcherProvider, THEME } from "../contexts/theme/theme.provider";
import { CartProvider } from "../contexts/cart/cart.provider";
// external css
import "@glidejs/glide/dist/css/glide.core.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../assets/css/reset.css";

const App: NextPage<{
  Component: any;
  pageProps: any;
}> = ({ Component, pageProps }) => {
  const [theme, setTheme] = React.useState(THEME.light);
  React.useEffect(() => {
    let SAVED_THEME = localStorage.getItem("theme");
    if (SAVED_THEME === null) {
      SAVED_THEME = THEME.light;
    }
    setTheme(SAVED_THEME);
  }, []);
  return (
    <ThemeSwitcherProvider value={{ theme, setTheme }}>
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider
          theme={
            theme === THEME.light
              ? { ...LightTheme, direction: "ltr" }
              : { ...DarkTheme, direction: "ltr" }
          }
        >
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </BaseProvider>
      </StyletronProvider>
    </ThemeSwitcherProvider>
  );
};

export default App;
