import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addShopping } from "../store/shopping/action";
import toast from "react-hot-toast";

function AddToCart({ addShopping, data }) {
  return (
    <button
      onClick={() => {
        addShopping(data);
        toast.success("Thêm giỏ hàng thành công.");
      }}
      name="AddToCart"
      className="btn btn-danger rounded-sm"
    >
      <span className="mr-2">{`Thêm giỏ hàng`}</span>
      <AiOutlineShopping size={20} />
    </button>
  );
}

const mapDispatchTopProps = (dispatch) => {
  return {
    addShopping: bindActionCreators(addShopping, dispatch),
  };
};

export default connect(null, mapDispatchTopProps)(AddToCart);
