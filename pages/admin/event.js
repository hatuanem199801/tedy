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
import AddEvent from "../../components/AddEvent";
import moment from "moment";

export default function Event({ data }) {
  const mainTitle = `Quản lý sự kiện`;
  const [events, setEvents] = useState(data);
  const handleAddEvent = (product) => {
    setEvents(product);
  };
  return (
    <div>
      <Metadata title={mainTitle} description={mainTitle} />
      <Heading>{mainTitle}</Heading>
      <Divider />
      <AddEvent onAddEvent={handleAddEvent} />
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Mã SK</Th>
            <Th>Tên sự kiện</Th>
            <Th>Hình ảnh</Th>
            <Th>Mô tả</Th>
            <Th>Ngày tạo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events &&
            events.map((data) => {
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
  const result = await fetcher(`${serverHost}/api/event`);
  return {
    props: {
      data: result.data,
    },
  };
}
