import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import LayoutAdmin from "../components/LayoutAdmin";
import { wrapper } from "../store";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  if (router.name !== "/" && router.pathname.indexOf("admin") === 1) {
    return <LayoutAdmin children={<Component {...pageProps} />} />;
  }
  return <Layout children={<Component {...pageProps} />} />;
};

export default wrapper.withRedux(MyApp);
