import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import App, { AppContext, AppProps } from "next/app";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../utils/axios";
import { AxiosErrorData } from "../hooks/useRequest";
import Header from "../components/header";

interface MyAppPropsI extends AppProps {
  currentUser: any;
}

function MyApp({ Component, pageProps, currentUser }: MyAppPropsI) {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  try {
    const { ctx, Component } = appContext;
    const { headers } = (ctx.req as AxiosRequestConfig) ?? {};
    const { data } = await axiosInstance.get("/api/users/currentUser", { headers });

    let pageProps = {};
    if (Component && Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);

    return {
      pageProps,
      ...data,
    };
  } catch (error) {
    return error as AxiosErrorData;
  }
};

export default MyApp;
