import { Fragment } from "react";
import Head from "next/head";
import { Provider } from "react-redux";

import store from "@/store/store";

import NavBar from "@/components/NavBar";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <Provider store={store}>
      <Head>
        <title>Homeco</title>
      </Head>
      <NavBar />
      <section className="mainContent">
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </section>
    </Provider>
  );
}

const EmptyLayout = ({ children }) => <Fragment>{children}</Fragment>;
