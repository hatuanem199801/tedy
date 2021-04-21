import Metadata from "../../components/Metadata";
import React, { useEffect, useState } from "react";
import { serverHost } from "../../configs";
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
  Box,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import formatMoney from "../../libs/moneyFormat";
import AddProduct from "../../components/AddProduct";
import moment from "moment";

export default function Product({ data }) {
  const mainTitle = `Quản lý sản phẩm`;
  const [products, setProducts] = useState(data);
  const handleAddProduct = (product) => {
    console.log(product);
    setProducts(product);
  };
  return (
    <>
      <Metadata title={mainTitle} description={mainTitle} />
      <Heading>{mainTitle}</Heading>
      <Divider />
      <AddProduct addProduct={handleAddProduct} />
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Mã SP</Th>
            <Th>Tên sản phẩm</Th>
            <Th>Loai SP</Th>
            <Th isNumeric>Giá</Th>
            <Th>Hình ảnh</Th>
            <Th>Ngay tao</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products &&
            products.map((data) => {
              return (
                <Tr key={data._id}>
                  <Td>{data._id}</Td>
                  <Td>{data.name}</Td>
                  <Td>{data.category.title}</Td>
                  <Td isNumeric color="red" fontWeight="bold">
                    {formatMoney(data.price)}
                  </Td>
                  <Td>
                    <Image
                      src={data.images[0]}
                      width={50}
                      height={50}
                      alt={data.name}
                    />
                  </Td>
                  <td>{moment(data.date_created).startOf("hour").fromNow()}</td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

export async function getServerSideProps() {
  const result = await fetcher(`${serverHost}/api/product`);
  return {
    props: {
      data: result.data,
    },
  };
}
