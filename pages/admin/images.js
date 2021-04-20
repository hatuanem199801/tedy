import Metadata from "../../components/Metadata";
import ImageGrid from "../../components/ImageGrid";
import Modal from "../../components/Modal";
import React, { useState } from "react";
import { Heading } from "@chakra-ui/layout";

export default function Images() {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div className="App">
      <Heading>Thư viện hình ảnh</Heading>
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}
