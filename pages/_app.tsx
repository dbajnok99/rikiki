import { Provider } from "react-redux";
import store, { persistor } from "../app/store";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import "@/screens/style.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Rikiki</title>
          <meta name="description" content="Rikiki számláló applikáció" />
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
