import Head from "next/head";
import ListProductBaseCategory from "../components/ListProductBaseCategory";
import EventSlider from "../components/EventSlider";
import Mission from "../components/Mission";
import FollowUs from "../components/FollowUs";
import { serverHost } from "../configs";
import fetcher from "../libs/fetcher";
import PropTypes from "prop-types";

export default function Home({ categories }) {
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
        {categories &&
          categories.map((category) => (
            <div className="mb-4" key={category._id}>
              <ListProductBaseCategory
                category={category.seourl}
                name={category.title}
              />
            </div>
          ))}

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

export async function getServerSideProps() {
  const result = await fetcher(`${serverHost}/api/category`);
  return {
    props: {
      categories: result.data,
    },
  };
}

Home.propTypes = {
  categories: PropTypes.array.isRequired,
};
