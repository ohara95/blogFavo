import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';
import { RecoilRoot } from 'recoil';
import { auth } from '../root/pages/utils/firebase';
import { useRouter } from 'next/dist/client/router';

/**
 * クライアント側のレンダリングカスタマイズ
 * 全てのpageをラップ
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  /**
   * サーバー側に挿入されたCSSを削除
   */
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/');
      } else {
        router.push('/signup');
      }
    });
  }, []);

  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  );
}
