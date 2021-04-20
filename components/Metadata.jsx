import React from "react";
import Head from "next/head";

export default function Metadata({ title, description, index }) {
  return (
    <Head>
      <title>{`admin - ${title || "admin layout"}`}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={`${!index ? "noindex" : "index"}, ${
          !index ? "nofollow" : "follow"
        }`}
      />
    </Head>
  );
}
