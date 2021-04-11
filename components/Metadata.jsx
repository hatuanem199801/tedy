import React from "react";
import Head from "next/head";

export default function Metadata({ title, description }) {
  return (
    <Head>
      <title>{`admin - ${title || "admin layout"}`}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
}
