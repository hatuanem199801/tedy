import React from "react";
import Head from "next/head";

export default function Metadata({ title, description, index, children }) {
  return (
    <Head>
      <title>{`${!index ? "admin" : "MyMy"} - ${title}`}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={`${!index ? "noindex" : "index"}, ${
          !index ? "nofollow" : "follow"
        }`}
      />
      {children && children}
    </Head>
  );
}
