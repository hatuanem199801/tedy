import React from "react";
import ListOrderItem from "../components/ListOrderItem";
import PaymentInfo from "../components/PaymentInfo";
import Head from "next/head";
import { serverHost } from "../configs";

function Order() {
  return (
    <div className="container-md bg-white my-3 p-4">
      <Head>
        <title>{`Giỏ hàng - Cửa hàng thời trang MyMy`}</title>
        <meta name="description" content={"Giỏ hàng của bạn - MyMy Shopping"} />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href={`${serverHost}/order`}
          name="canonicallink"
        />
      </Head>
      <h1 className="font-weight-light">Giỏ hàng</h1>
      <hr />
      <div className="row">
        <div className="col-12 col-sm-7">
          <ListOrderItem />
        </div>
        <div className="col-12 col-sm-5 mt-sm-0 mt-2 px-0">
          <PaymentInfo />
        </div>
      </div>
    </div>
  );
}

export default Order;
