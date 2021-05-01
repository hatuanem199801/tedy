import {
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/form-control";
import { Input, Button, Heading, Box, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import fetcher from "../../libs/fetcher";
import { serverHost } from "../../configs";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleOnSubmit = async () => {
    const result = await fetcher(`${serverHost}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (result.status == 200) {
      toast.success("Xác thực tài khoản thành công.");
      return router.push("/admin/product");
      setState({});
    } else {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng.");
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
    <Box w="container.sm">
      <Heading as="h1">Xác thực tài khoản - TEDY</Heading>
      <hr />
      <FormControl id="username">
        <FormLabel>Tên đăng nhập</FormLabel>
        <Input
          onChange={handleOnChange}
          type="text"
          name="username"
          autoComplete="off"
          required
        />
        <FormHelperText>Tên đăng nhập là bắt buộc.</FormHelperText>
      </FormControl>
      <FormControl id="password">
        <FormLabel>Mật khẩu</FormLabel>
        <Input
          onChange={handleOnChange}
          type="password"
          name="password"
          autoComplete="off"
          required
        />
        <FormHelperText>Mật khẩu là bắt buộc.</FormHelperText>
      </FormControl>
      <Divider />
      <FormControl id="submit">
        <Button colorScheme="green" onClick={handleOnSubmit}>
          Đăng nhập
        </Button>
      </FormControl>
    </Box>
  );
}
