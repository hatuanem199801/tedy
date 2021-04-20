import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import Popup from "../components/Popup";
import {
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/form-control";
import { Input, Textarea, Button } from "@chakra-ui/react";

export default function AddProduct() {
  const [state, setState] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const handleOnSubmit = () => {
    console.log(state);
  };

  const handleSetImage = (url) => {
    if (url) {
      setState({
        image: url,
      });
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setState({ [name]: value });
  };

  return (
    <>
      <Popup
        title="Thêm mới sản phẩm"
        content={
          <>
            <FormControl id="name">
              <FormLabel>Tên sản phẩm</FormLabel>
              <Input
                onChange={handleOnChange}
                type="text"
                name="name"
                required
              />
              <FormHelperText>Tên sản phẩm là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="price">
              <FormLabel>Đơn giá</FormLabel>
              <Input
                onChange={handleOnChange}
                type="number"
                name="price"
                required
              />
              <FormHelperText>Đơn giá là bắt buộc và là số.</FormHelperText>
            </FormControl>
            <FormControl id="images">
              <FormLabel>Hình ảnh</FormLabel>
              <UploadForm setImage={handleSetImage} />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Mô tả</FormLabel>
              <Textarea onChange={handleOnChange} name="description" />
              <FormHelperText>Mô tả là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="submit">
              <Button onClick={handleOnSubmit}>Thêm mới</Button>
            </FormControl>
          </>
        }
      />
    </>
  );
}
