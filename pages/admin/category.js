import Metadata from "../../components/Metadata";
import React, { useState } from "react";
import Image from "next/image";
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
} from "@chakra-ui/react";
import moment from "moment";
import AddCategory from "../../components/AddCategory";

export default function Category({ data }) {
  const mainTitle = `Quản lý loại sản phẩm`;
  const [categories, setCategories] = useState(data);
  const handleAddCategory = (category) => {
    setCategories(category);
  };
  return (
    <div>
      <Metadata title={mainTitle} description={mainTitle} />
      <Heading>{mainTitle}</Heading>
      <Divider />
      <AddCategory onAddCategory={handleAddCategory} />
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Mã LSP</Th>
            <Th>Tên LSP</Th>
            <Th>Hình ảnh</Th>
            <Th>Mô tả</Th>
            <Th>Ngày tạo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories &&
            categories.map((data) => {
              return (
                <Tr key={data._id}>
                  <Td>{data._id}</Td>
                  <Td>{data.title}</Td>
                  <Td>
                    <Image
                      src={data.image}
                      width={50}
                      height={50}
                      alt={data.name}
                    />
                  </Td>
                  <Td>{data.description}</Td>
                  <td>{moment(data.date_created).startOf("hour").fromNow()}</td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export async function getServerSideProps() {
  const result = await fetcher(`${serverHost}/api/category`);
  return {
    props: {
      data: result.data,
    },
  };
}
