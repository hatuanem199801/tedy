import Head from "next/head";
import Image from "next/image";
import moneyFormat from "../libs/moneyFormat";
import PropTypes from "prop-types";
import styles from "../styles/components/ProductDetail.module.css";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import ListProductBaseCategory from "../components/ListProductBaseCategory";
import AddToCart from "../components/AddToCart";
import { useState } from "react";
import { motion } from "framer-motion";
import { serverHost } from "../configs";
import HtmlToReact from "html-to-react";

export default function Product({ data }) {
  const HTML = new HtmlToReact.Parser();
  const { name, images, price, description, seourl, category } = data;
  const [imageSlide, setImageSlide] = useState(images[0]);
  return (
    <>
      <main className={`${styles.product} container-md bg-white my-3 p-4`}>
        <article>
          <Head>
            <title>
              {name} {`- Cửa hàng thời trang MyMy`}
            </title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <link
              rel="canonical"
              href={`${serverHost}/${seourl}`}
              name="canonicallink"
            />
          </Head>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a className="text-primary ">{`Trang chủ`}</a>
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link
                  href={{
                    pathname: "/category/[seourl]",
                    query: { seourl: category.seourl },
                  }}
                >
                  <a
                    className="text-primary"
                    href={`/category/${category.seourl}`}
                  >
                    {category.title}
                  </a>
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <span className="readonly">{name}</span>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-12 col-sm-6">
              <motion.div
                initial={{
                  opacity: 0,
                  x: 1,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                }}
              >
                {imageSlide ? (
                  <Image
                    src={imageSlide}
                    height={480}
                    width={300}
                    alt={name}
                    layout="responsive"
                  />
                ) : (
                  <Skeleton height={480} width={360} />
                )}
              </motion.div>
              <div className="d-flex justify-content-center my-3">
                {(images &&
                  images.map((image) => {
                    return (
                      <div
                        key={image}
                        onClick={() => setImageSlide(image)}
                        className={`${styles.imageDot} mx-1`}
                      >
                        <Image
                          src={image}
                          height={180}
                          width={120}
                          alt={name}
                        />
                      </div>
                    );
                  })) || (
                  <Skeleton height={60} width={60} className="m-2" count={3} />
                )}
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <h1>{name || <Skeleton />}</h1>
              <h2 className={styles.price}>
                {price ? moneyFormat(price) : <Skeleton />}
              </h2>
              <hr />
              <AddToCart data={data} />
              <div className="mt-2">
                {HTML.parse(description) || <Skeleton count={10} />}
              </div>
            </div>
          </div>
        </article>
        <hr />
        <ListProductBaseCategory
          category={category.seourl}
          name={category.title}
        />
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { seourl } = params;
  const result = await fetch(`${serverHost}/api/product/seourl/${seourl}`);
  const product = await result.json();
  return {
    props: {
      data: JSON.parse(JSON.stringify(product.data)),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let paths;
  let result = await fetch(`${serverHost}/api/product`);
  let products = await result.json();
  products = JSON.parse(JSON.stringify(products.data));
  paths = products.map((product) => {
    return { params: { seourl: product.seourl } };
  });
  return {
    paths,
    fallback: false,
  };
}

Product.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
