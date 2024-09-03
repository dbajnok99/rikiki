import { Provider } from "react-redux";
import store, { persistor } from "../app/store";
import { Metadata, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import "@/screens/style.css";

export const metadata: Metadata = {
  title: "Rikiki Számláló",
  description: "Rikiki Számláló",
  generator: "Next.js",
  manifest: "/manifest.json",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],

  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [{ rel: "apple-touch-icon", url: "/apple-touch-icon.png" }],
};

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
