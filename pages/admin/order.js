import React, { useEffect, useState } from "react";
import { serverHost } from "../../configs";
import Metadata from "../../components/Metadata";
import fetcher from "../../libs/fetcher";
import Image from "next/image";
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
import Popup from "../../components/Popup";
import formatMoney from "../../libs/moneyFormat";
import { AiFillPrinter } from "react-icons/ai";
import moment from "moment";
import print from "../../libs/print";

export default function Order() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await fetcher(`${serverHost}/api/order`);
    if (result && result.status === 200 && result.data.length > 0) {
      setData(result.data);
    }
  }, []);

  const handleOnPrinter = (name, customer, products, total) => {
    return print({ customer, products, total }).save(name);
  };

  return (
    <>
      <Metadata
        title={`Quản lý đơn hàng`}
        description={"Quản lý đơn hàng của khách hàng"}
      />
      <Heading>{`Quản lý đơn hàng`}</Heading>
      <Divider />
      <Table variant="striped" colorScheme="facebook">
        <Thead>
          <Tr>
            <Th>Don hang so</Th>
            <Th>Ho vs Ten</Th>
            <Th>Dia chi</Th>
            <Th>SDT</Th>
            <Th isNumeric>Don gia</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((order) => {
              const content = (
                <Table variant="striped" colorScheme="facebook">
                  <Thead>
                    <Tr>
                      <Th>Ten san pham</Th>
                      <Th isNumeric>Don gia</Th>
                      <Th>Hinh anh</Th>
                      <Th isNumeric>So luong</Th>
                      <Th isNumeric>Thanh tien</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {order.products.map(({ _id, product, quantity }) => {
                      return (
                        <Tr key={_id}>
                          <Td>{product.name || ""}</Td>
                          <Td color="red" isNumeric>
                            {formatMoney(product.price)}
                          </Td>
                          <Td>
                            <Image
                              src={product.images[0]}
                              height={70}
                              width={70}
                            />
                          </Td>
                          <Td isNumeric>{quantity}</Td>
                          <Td color="red" isNumeric>
                            {formatMoney(product.price * quantity)}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              );

              let finalTotal = order.products
                .map(({ product, quantity }) => product.price * quantity)
                .reduce((total, current) => total + current);
              return (
                <Tr key={order._id}>
                  <Td isTruncated>
                    <Popup
                      content={content || ""}
                      title={`${order._id.substring(5, 10)} - ${moment(
                        order.date_created
                      )
                        .startOf("hour")
                        .fromNow()}`}
                      footer={
                        <Button
                          onClick={() =>
                            handleOnPrinter(
                              `${order._id.substring(5, 10)}.pdf`,
                              {
                                fullname: order.fullname,
                                phonenumber: order.phonenumber,
                                address: order.address,
                              },
                              order.products,
                              finalTotal
                            )
                          }
                        >
                          In hoá đơn
                          <AiFillPrinter />
                        </Button>
                      }
                    />
                  </Td>
                  <Td isTruncated>{order.fullname}</Td>
                  <Td isTruncated>{order.address}</Td>
                  <Td>{order.phonenumber}</Td>
                  <Td color="red" isNumeric>
                    {formatMoney(finalTotal)}
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}
