import '@/styles/globals.css';
import 'swiper/css';
import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate, DehydratedState } from '@tanstack/react-query';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { Database } from '@/types';
import { Poppins } from '@next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import muiTheme from '../styles/muiTheme';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../styles/emotionCache';
import { ByPassHydration, Layout } from '@/components';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';
import { queryStaleDuration } from '@/constants';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  initialSession: Session;
  dehydratedState: DehydratedState;
}

function App(props: MyAppProps) {
  console.log("props", process.env);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: queryStaleDuration,
            refetchInterval: false,
          },
        },
      })
  );
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

  return (
    // Provide the client to your App
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              <main className={poppins.className}>
                <ByPassHydration>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ByPassHydration>
              </main>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
export default appWithTranslation(App, nextI18NextConfig);
