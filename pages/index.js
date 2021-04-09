import Head from "next/head";
import ListProductBaseCategory from "../components/ListProductBaseCategory";
import EventSlider from "../components/EventSlider";
import Mission from "../components/Mission";
import FollowUs from "../components/FollowUs";
import { serverHost } from "../configs";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Trang chủ - MyMy</title>
        <meta name="description" content={`Mua sam that de dang`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${serverHost}/`} name="canonicallink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-4">
        <EventSlider />
      </div>
      <main className="container-md">
        <div className="mb-4">
          <ListProductBaseCategory category={"hat"} name="Hat" />
        </div>
        <div className="mb-4">
          <ListProductBaseCategory category={"shoes"} name="Shoes" />
        </div>
        <div className="mb-4">
          <Mission />
        </div>
        <div className="mb-4">
          <FollowUs />
        </div>
      </main>
    </div>
  );
}
