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

export default function AddProduct({ addProduct }) {
  const [state, setState] = useState({
    name: "",
    price: 0,
    seourl: "",
    images: [],
    description: "",
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
        toast.success("Them san pham thành công.");
        setState({});
        addProduct(result.data);
      }
    } else {
      toast.error("Them san pham khong thành công.");
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
                autoComplete="off"
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
                required
              />
              <FormHelperText>SEOURL là bắt buộc.</FormHelperText>
            </FormControl>
            <FormControl id="category">
              <FormLabel>Loai sản phẩm</FormLabel>
              <Select
                name="category"
                onChange={handleOnChange}
                placeholder="Chon loai san pham"
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
