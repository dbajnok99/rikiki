import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "../app/store";
import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
