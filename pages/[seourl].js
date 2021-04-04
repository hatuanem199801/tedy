import Head from "next/head";
import fetcher from "../libs/fetcher";
import { serverHost } from "../configs";
import Image from "next/image";
import moneyFormat from "../libs/moneyFormat";
import PropTypes from "prop-types";
import styles from "../styles/components/ProductDetail.module.css";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import ListProductBaseCategory from "../components/ListProductBaseCategory";
import AddToCart from "../components/AddToCart";

export default function Product({ data }) {
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
                  <a>{`Trang chủ`}</a>
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link
                  href={{
                    pathname: "/[seourl]",
                    query: { seourl },
                  }}
                >
                  <a className="text-primary" href={`/${seourl}`}>
                    {name}
                  </a>
                </Link>
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
                <Image
                  src={imageSlide}
                  height={480}
                  width={480}
                  alt={name}
                  layout="responsive"
                />
              </motion.div>
              <div className="d-flex justify-content-center my-3">
                {images &&
                  images.map((image) => {
                    return (
                      <div
                        key={image}
                        onClick={() => setImageSlide(image)}
                        className={`${styles.imageDot} mx-1`}
                      >
                        <Image src={image} height={60} width={60} alt={name} />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <h1>{name}</h1>
              <h2 className={styles.price}>{moneyFormat(price)}</h2>
              <hr />
              <AddToCart data={data} />
              <p className="mt-2">{description}</p>
            </div>
          </div>
        </article>
        <hr />
        <ListProductBaseCategory category={category} name={category} />
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
      data: JSON.parse(JSON.stringify(product.data[0])),
    },
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
