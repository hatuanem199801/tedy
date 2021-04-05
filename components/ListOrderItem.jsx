import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchShopping,
  clearShopping,
  decrement,
  increment,
  remove,
  getShopping,
} from "../store/shopping/action";
import styles from "../styles/components/OrderItem.module.css";
import Image from "next/image";
import Link from "next/link";
import formatMoney from "../libs/moneyFormat";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

function ListOrderItems({
  fetchShopping,
  shopping,
  handleDecrement,
  handleIncrement,
  handleRemove,
  handleGet,
}) {
  return (
    <ul className={`${styles.orderList} list-group`}>
      {shopping &&
        shopping.map((item) => {
          return (
            <li
              key={item.product._id}
              className={`${styles.orderItem} list-group-item my-2 shadow rounded-0`}
            >
              <div className="row">
                <div className="col-3">
                  <Image
                    src={item.product.images[0]}
                    height={100}
                    width={100}
                  />
                </div>
                <div className="col-9">
                  <Link
                    href={{
                      pathname: "/san-pham/[seourl]",
                      query: { seourl: item.product.seourl },
                    }}
                  >
                    <a
                      className="text-dark text-uppercase"
                      href={`/san-pham/${item.product.seourl}`}
                    >
                      <strong>{item.product.name}</strong>
                    </a>
                  </Link>
                  <p className="text-danger">
                    {formatMoney(item.product.price)}
                  </p>
                  <div className="controls">
                    <button
                      className="btn btn-sm p-0"
                      onClick={() => {
                        handleDecrement(item.product);
                        fetchShopping();
                        toast.success("Cập nhật sản phẩm thành công.");
                      }}
                    >
                      <AiFillMinusSquare size={25} />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary px-3">
                      <span>{item.quantity}</span>
                    </button>
                    <button
                      className="btn btn-sm p-0"
                      onClick={() => {
                        handleIncrement(item.product);
                        fetchShopping();
                        toast.success("Cập nhật sản phẩm thành công.");
                      }}
                    >
                      <AiFillPlusSquare size={25} />
                    </button>
                  </div>
                  <hr />
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => {
                      handleRemove(item.product);
                      fetchShopping();
                      toast.success("Xoá sản phẩm thành công.");
                    }}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </li>
          );
        })}

      {shopping && shopping.length === 0 && (
        <div className="text-warning">{`Không có sản phẩm nào trong giỏ hàng.`}</div>
      )}
    </ul>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShopping: bindActionCreators(fetchShopping, dispatch),
    handleDecrement: bindActionCreators(decrement, dispatch),
    handleIncrement: bindActionCreators(increment, dispatch),
    handleRemove: bindActionCreators(remove, dispatch),
    handleGet: bindActionCreators(getShopping, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    shopping: state.shopping.shopping,
  };
};

ListOrderItems.propTypes = {
  shopping: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderItems);
