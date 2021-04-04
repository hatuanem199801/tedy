import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchShopping, clearShopping } from "../store/shopping/action";
import styles from "../styles/components/OrderItem.module.css";
import Image from "next/image";
import Link from "next/link";
import formatMoney from "../libs/moneyFormat";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

function ListOrderItems({ fetchShopping, clearShopping, shopping }) {
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
                    <button className="btn btn-sm p-0">
                      <AiFillMinusSquare size={25} />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary px-3">
                      <span>{item.quantity}</span>
                    </button>
                    <button className="btn btn-sm p-0">
                      <AiFillPlusSquare size={25} />
                    </button>
                  </div>
                  <hr />
                  <a className="text-danger">Xoá</a>
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
    clearShopping: bindActionCreators(clearShopping, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    shopping: state.shopping.shopping,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderItems);
