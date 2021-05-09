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
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import formatMoney from "../../libs/moneyFormat";
import AddProduct from "../../components/AddProduct";
import moment from "moment";
import { useRouter } from "next/router";

export default function Product({ data }) {
  const router = useRouter();
  const mainTitle = `Bán hàng`;
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

  const handleOnDelete = (data) => {
    const result = fetcher(`${serverHost}/api/product/delete/${data._id}`, {
      method: "DELETE",
    });
    if (result.status === 200) {
      setProducts(products.filter((product) => product._id !== data._id));
    }
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
                  <Td>{data.category && data.category.title}</Td>
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
                  <Td>{moment(data.date_created).startOf("hour").fromNow()}</Td>
                  <Td>
                    <Button onClick={() => handleOnDelete(data)}>Xoá</Button>
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
