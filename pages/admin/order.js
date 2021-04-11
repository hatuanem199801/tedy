import React, { useEffect, useState } from "react";
import { serverHost } from "../../configs";
import Metadata from "../../components/Metadata";
import fetcher from "../../libs/fetcher";
import {
  Divider,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export default function Order() {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const result = await fetcher(`${serverHost}/api/order`);
    if (result && result.status === 200 && result.data.length > 0) {
      setData(result.data);
    }
  }, []);
  return (
    <>
      <Metadata
        title={`Quản lý đơn hàng`}
        description={"Quản lý đơn hàng của khách hàng"}
      />
      <Heading>Order admin</Heading>
      <Divider />
      <Table variant="striped" colorScheme="gray">
        <TableCaption placement="bottom">Managed by MongoDB</TableCaption>
        <Thead>
          <Tr>
            <Th>Don hang so</Th>
            <Th>HovsTen</Th>
            <Th isNumeric>Don gia</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data ? (
            data.map((order) => {
              return (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.fullname}</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={4}>yards</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  );
}
