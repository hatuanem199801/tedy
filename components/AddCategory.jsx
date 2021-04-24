import React, { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import Popup from "../components/Popup";
import {
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/form-control";
import {
  Select,
  Flex,
  Input,
  Textarea,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import fetcher from "../libs/fetcher";
import { serverHost } from "../configs";
import toast from "react-hot-toast";

export default function AddCategory({ onAddCategory }) {
  const [state, setState] = useState({
    title: "",
    image: "",
    seourl: "",
    description: "",
  });
  const handleOnSubmit = async () => {
    if (state.title && state.image.trim() !== "" && state.description) {
      const result = await fetcher(`${serverHost}/api/category`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (result.status == 200) {
        toast.success("Thêm loại sản phẩm thành công.");
        onAddCategory(result.data);
      }
    } else {
      toast.error("Thêm loại sản phẩm không thành công.");
    }
  };

  const handleSetImage = (url) => {
    if (url) {
      setState((prevState) => ({
        ...prevState,
        image: url,
      }));
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Popup
        title="Thêm mới loại sản phẩm"
        content={
          <>
            <FormControl id="title">
              <FormLabel>Tên loại sản phẩm</FormLabel>
              <Input
                onChange={handleOnChange}
                type="text"
                name="title"
                autoComplete="off"
                required
              />
              <FormHelperText>Tên loại sản phẩm là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="seourl">
              <FormLabel>SEOURL loại sản phẩm</FormLabel>
              <Input
                onChange={handleOnChange}
                type="text"
                name="seourl"
                autoComplete="off"
                required
              />
              <FormHelperText>SEOURL loại sản phẩm là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="image">
              <FormLabel>Hình ảnh</FormLabel>
              <UploadForm setImage={handleSetImage} />
              <Flex>
                {state.image && (
                  <img src={state.image} height={70} width={70} />
                )}
              </Flex>
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
