import { serverHost } from "../configs/index";
import fetcher from "../libs/fetcher";
import React, { useState } from "react";

export default function ProductForm({ handleAddProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    images: "",
    description: "",
  });

  const contentType = "application/json";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      images: ["https://picsum.photos/480"],
      category: "hat",
    };
    const result = await fetcher(`${serverHost}/api/product`, {
      method: "POST",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(data),
    });
    handleAddProduct(result.data);
  };

  const handleOnChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
    return {};
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="control-label">
          Tên sản phẩm
        </label>
        <input
          onChange={handleOnChange}
          type="text"
          name="name"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price" className="control-label">
          Đơn giá
        </label>
        <input
          onChange={handleOnChange}
          type="number"
          name="price"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="images" className="control-label mr-2">
          Hình ảnh
        </label>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          className="form-input"
          multiple
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="control-label mr-2">
          Mô tả
        </label>
        <textarea rows="5" name="description" className="form-control" />
      </div>
      <div className="form-group">
        <button onClick={handleSubmit} className="btn btn-danger">
          Tạo mới
        </button>
      </div>
    </form>
  );
}
