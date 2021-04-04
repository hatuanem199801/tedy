import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchShopping } from "../store/shopping/action";
import styles from "../styles/components/OrderItem.module.css";
import formatMoney from "../libs/moneyFormat";

function PaymentInfo({ fetchShopping, totalMoney }) {
  return (
    <div className={``}>
      {totalMoney > 0 ? (
        <div>
          <h2 className="font-weight-light">{`Thanh toán`}</h2>
          <hr />
          <div className="shadow p-3">
            <div className="d-flex justify-content-between">
              <span className="font-weight-light">{`Tạm tính`}</span>
              <span className="font-weight-light">{totalMoney}</span>
            </div>
            <hr />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShopping: bindActionCreators(fetchShopping, dispatch),
  };
};

const mapStateToProps = (state) => {
  const data = state.shopping.shopping;
  const totalMoney =
    data.length &&
    data.reduce((item, current) => {
      return current + item.quantity * item.product.price;
    });
  return {
    totalMoney: totalMoney,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
