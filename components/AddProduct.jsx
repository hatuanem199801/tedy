import React, { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import Popup from "../components/Popup";
import {
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/form-control";
import { Select, Flex, Input, Textarea, Button } from "@chakra-ui/react";
import fetcher from "../libs/fetcher";
import { serverHost } from "../configs";
import toast from "react-hot-toast";
import CKEditor from "react-ckeditor-component";

export default function AddProduct({ addProduct, title, data }) {
  let [state, setState] = useState({
    id: (data && data._id) || "",
    name: (data && data.name) || "",
    category: (data && data.category._id) || "",
    price: (data && data.price) || 0,
    seourl: (data && data.seourl) || "",
    images: (data && data.images) || [],
    description: (data && data.description) || "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const result = await fetcher(`${serverHost}/api/category`);
    const categoryList =
      result.data &&
      result.data.map((item) => {
        return {
          id: item._id,
          name: item.title,
        };
      });
    setCategories(categoryList);
  }, []);

  const handleOnSubmit = async () => {
    if (
      state.name &&
      state.images.length > 0 &&
      state.description &&
      state.seourl &&
      state.price
    ) {
      const result = await fetcher(`${serverHost}/api/product`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (result.status == 200) {
        toast.success("Thêm sản phẩm thành công.");
        addProduct(result.data);
        setState({
          name: "",
          price: 0,
          seourl: "",
          images: [],
          description: "",
        });
      }
    } else {
      toast.error("Thêm sản phẩm không thành công.");
    }
  };

  const handleSetImage = (url) => {
    if (url) {
      setState((prevState) => ({
        ...prevState,
        images: [url, ...prevState.images],
      }));
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "category") {
      setState((prevState) => ({
        ...prevState,
        category: value,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleOnChangeDescription = (e) => {
    const description = e.editor.getData();
    setState((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  return (
    <>
      <Popup
        title={title || "Thêm mới sản phẩm"}
        content={
          <>
            <FormControl id="name">
              <FormLabel>Tên sản phẩm</FormLabel>
              <Input
                onChange={handleOnChange}
                type="text"
                name="name"
                autoComplete="off"
                value={state.name}
                required
              />
              <FormHelperText>Tên sản phẩm là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="seourl">
              <FormLabel>SEOURL sản phẩm</FormLabel>
              <Input
                onChange={handleOnChange}
                type="text"
                name="seourl"
                autoComplete="off"
                value={state.seourl}
                required
              />
              <FormHelperText>SEOURL là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="category">
              <FormLabel>Loai sản phẩm</FormLabel>
              <Select
                name="category"
                onChange={handleOnChange}
                placeholder="Chon loại sản phẩm"
                value={state.category}
              >
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Select>
              <FormHelperText>Tên sản phẩm là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="price">
              <FormLabel>Đơn giá</FormLabel>
              <Input
                onChange={handleOnChange}
                type="number"
                name="price"
                value={state.price}
                required
              />
              <FormHelperText>Đơn giá là bắt buộc và là số.</FormHelperText>
            </FormControl>
            <FormControl id="images">
              <FormLabel>Hình ảnh</FormLabel>
              <UploadForm setImage={handleSetImage} />
              <Flex>
                {state.images &&
                  state.images.map((item) => (
                    <img
                      style={{ margin: 10 }}
                      key={item}
                      src={item}
                      height={70}
                      width={70}
                    />
                  ))}
              </Flex>
            </FormControl>
            <FormControl id="description">
              <FormLabel>Mô tả</FormLabel>
              <CKEditor
                activeClass="p10"
                name="description"
                content={state.description}
                events={{
                  change: handleOnChangeDescription,
                }}
              />
              <FormHelperText>Mô tả là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="submit">
              <Button onClick={handleOnSubmit}>{title || "Thêm mới"}</Button>
            </FormControl>
          </>
        }
      />
    </>
  );
}
