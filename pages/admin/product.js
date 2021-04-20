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

export default function Product({ data }) {
  const mainTitle = `Quản lý sản phẩm`;
  return (
    <>
      <Metadata title={mainTitle} description={mainTitle} />
      <Heading>{mainTitle}</Heading>
      <Divider />
      <AddProduct />
      <Table variant="striped" colorScheme="facebook">
        <Thead>
          <Tr>
            <Th>Mã SP</Th>
            <Th>Tên sản phẩm</Th>
            <Th isNumeric>Giá</Th>
            <Th>Hình ảnh</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((data) => {
              return (
                <Tr key={data._id}>
                  <Td>{data._id}</Td>
                  <Td>{data.name}</Td>
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
