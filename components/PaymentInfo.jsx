import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearShopping } from "../store/shopping/action";
import formatMoney from "../libs/moneyFormat";
import { serverHost } from "../configs";
import fetcher from "../libs/fetcher";
import toast from "react-hot-toast";

function PaymentInfo({ clear, data }) {
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
    setInfo({ ...info, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data) {
      const products = data.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      });
      const body = {
        ...info,
        products,
      };
      const result = await fetcher(`${serverHost}/api/order`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (result.status == 200) {
        toast.success("Đơn hàng được đặt thành công.");
        clear();
      }
    }
  };

  return (
    <>
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
              {`Thanh toán`}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    clear: bindActionCreators(clearShopping, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.shopping.shopping,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
