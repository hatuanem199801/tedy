import Head from "next/head";
import styles from "../styles/Home.module.css";
import { serverHost } from "../configs";
import Link from "next/link";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tedy app - Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://nextjs.org">Next.js! - Server Side Rendering </a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {data &&
            data.map((product) => {
              return (
                <Link
                  href={{
                    pathname: "/[seourl]",
                    query: { seourl: product.seourl },
                  }}
                >
                  <a
                    key={product._id}
                    href={`${product.seourl}`}
                    className={styles.card}
                  >
                    <h3>{product.name} &rarr;</h3>
                    <p>{product.price}</p>
                  </a>
                </Link>
              );
            })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const result = await fetch(`${serverHost}/api/product/null/10`);
  const products = await result.json();

  return {
    props: {
      data: JSON.parse(JSON.stringify(products.data)),
    },
  };
}
