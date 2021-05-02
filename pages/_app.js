import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import LayoutAdmin from "../components/LayoutAdmin";
import { wrapper } from "../store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import fetcher from "../libs/fetcher";
import { serverHost } from "../configs";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  if (router.name !== "/" && router.pathname.indexOf("admin") === 1) {
    useEffect(async () => {
      const result = await fetcher(`${serverHost}/api/user`);
      if (result.status !== 200 && !result.data) {
        return router.push("/admin/login");
      }
    }, []);
    return <LayoutAdmin children={<Component {...pageProps} />} />;
  }
  return <Layout children={<Component {...pageProps} />} />;
};

export default wrapper.withRedux(MyApp);
