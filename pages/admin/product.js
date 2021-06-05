import Metadata from "../../components/Metadata";
import React, { useEffect, useState } from "react";
import { serverHost } from "../../configs";
import { projectStorage } from "../../firebase/config";
import fetcher from "../../libs/fetcher";
import {
  Divider,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import formatMoney from "../../libs/moneyFormat";
import AddProduct from "../../components/AddProduct";
import moment from "moment";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Product({ data }) {
  const router = useRouter();
  const mainTitle = `Quản lý sản phẩm`;
  const [products, setProducts] = useState(data);

  useEffect(async () => {
    const result = await fetcher(`${serverHost}/api/user`);
    if (result.status !== 200) {
      return router.push("/admin/login");
    }
  }, []);

  const handleAddProduct = (product) => {
    setProducts(product);
  };

  const handleOnDelete = async (data) => {
    const result = await fetcher(
      `${serverHost}/api/product/delete/${data._id}`,
      {
        method: "DELETE",
      }
    );
    if (result.status === 200) {
      setProducts(products.filter((product) => product._id !== data._id));
      if (result.data.images && result.data.images.length > 0) {
        result.data.images.map(async (image) => {
          let ref = projectStorage.refFromURL(image);
          if (ref) {
            await ref.delete();
          }
        });
      }
    }
  };

  const handleActive = async (data) => {
    const result = await fetcher(
      `${serverHost}/api/product/active/${data._id}`,
      {
        method: "GET",
      }
    );
    if (result.status === 200) {
      setProducts(
        products.map((product) => {
          if (product._id === data._id) {
            product.isActive = result.data;
          }
          return product;
        })
      );
      toast.success("Cập nhật sản phẩm thành công");
    }
  };

  return (
    <>
      <Metadata title={mainTitle} description={mainTitle} />
      <Heading fontWeight={"light"}>{mainTitle}</Heading>
      <Divider my={"3"} bg={"black"} height={0.5} />
      <AddProduct addProduct={handleAddProduct} />
      <Table mt={4} size={"sm"} variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Tên sản phẩm</Th>
            <Th>Loai SP</Th>
            <Th isNumeric>Giá</Th>
            <Th>Hình ảnh</Th>
            <Th>Ngày tạo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products &&
            products.map((data) => {
              return (
                <Tr key={data._id}>
                  <Td>{data.name}</Td>
                  <Td>{data.category && data.category.title}</Td>
                  <Td isNumeric color="red" fontWeight="bold">
                    {formatMoney(data.price)}
                  </Td>
                  <Td>
                    <Image
                      src={data.images[0]}
                      width={48}
                      height={80}
                      alt={data.name}
                    />
                  </Td>
                  <Td>{moment(data.date_created).startOf("hour").fromNow()}</Td>
                  <Td>
                    <Button
                      colorScheme={data.isActive ? "green" : "red"}
                      onClick={() => handleActive(data)}
                      size={"sm"}
                      mr={2}
                    >
                      {data.isActive ? "Còn hàng" : "Hết hàng"}
                    </Button>
                    <AddProduct title={`Cập nhật`} data={data} />
                    <Button
                      size={"sm"}
                      onClick={() => {
                        if (
                          confirm("Bạn có chắc muốn xoá sản phẩm này không?")
                        ) {
                          handleOnDelete(data);
                        }
                      }}
                      ml={2}
                    >
                      Xoá
                    </Button>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

export async function getServerSideProps() {
  const result = await fetcher(`${serverHost}/api/product/admin`);
  return {
    props: {
      data: result.data,
    },
  };
}
