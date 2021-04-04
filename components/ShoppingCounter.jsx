import React, { useEffect, useState } from "react";
import { fetchShopping, clearShopping } from "../store/shopping/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";

const ShoppingCounter = ({ shopping, fetchShopping, clear }) => {
  useEffect(() => {
    fetchShopping();
  }, []);

  return (
    <>
      <Link href="/order">
        <a className="btn btn-danger" href="/order">
          {`Giỏ hàng`}
          <span className="mr-2">
            <AiOutlineShopping size={20} />
          </span>
          <span className="badge badge-light m-0 px-1">{shopping}</span>
        </a>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  const data = state.shopping.shopping;
  const count =
    data.length &&
    data
      .map((item) => item.quantity)
      .reduce((item, current) => {
        return item + current;
      });
  return {
    shopping: count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShopping: bindActionCreators(fetchShopping, dispatch),
    clear: bindActionCreators(clearShopping, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCounter);
