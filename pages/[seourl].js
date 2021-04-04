import Head from "next/head";
import { serverHost } from "../configs";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Product({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product detail page - {data.name}</title>
      </Head>
      <div className={styles.card}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div className={styles.card}>
        <h1>{data.name}</h1>
        <h2>{data.price}</h2>
        <p>{data.description}</p>
        <Image src={data.images[0]} height={480} width={480} layout="fixed" />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { seourl } = params;
  const result = await fetch(`${serverHost}/api/product/seourl/${seourl}`);
  const product = await result.json();
  console.log(product.data);
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
