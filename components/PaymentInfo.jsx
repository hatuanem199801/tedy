import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchShopping } from "../store/shopping/action";
import styles from "../styles/components/OrderItem.module.css";
import formatMoney from "../libs/moneyFormat";

function PaymentInfo({ fetchShopping, data }) {
  let total = 0;
  if (data) {
    const totalList = data.map((item) => item.product.price * item.quantity);
    if (totalList) {
      total = totalList.reduce((item, current) => item + current, 0);
    }
  }

  const [info, setInfo] = useState({
    fullname: "",
    address: "",
    phonenumber: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo({ [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(info);
  };

  return (
    <div className={``}>
      {total > 0 ? (
        <div>
          <h2 className="font-weight-light">{`Thanh toán`}</h2>
          <hr />
          <div className="shadow p-3">
            <div className="d-flex justify-content-between">
              <span className="font-weight-light">{`Tạm tính`}</span>
              <span className="font-weight-bold text-danger">
                {formatMoney(total)}
              </span>
            </div>
            <hr />
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="fullname">{`Họ và tên`}</label>
                <input
                  className="form-control"
                  value={info.fullname}
                  onChange={handleOnChange}
                  name="fullname"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">{`Số điện thoại`}</label>
                <input
                  className="form-control"
                  name="phonenumber"
                  value={info.phonenumber}
                  onChange={handleOnChange}
                  type="number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">{`Địa chỉ`}</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={info.address}
                  onChange={handleOnChange}
                  type="number"
                  required
                />
              </div>
            </form>
            <hr />
            <button
              className="btn btn-danger w-100"
              type="submit"
              onClick={handleOnSubmit}
            >
              Thanh toán
            </button>
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
  return {
    data: state.shopping.shopping,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
