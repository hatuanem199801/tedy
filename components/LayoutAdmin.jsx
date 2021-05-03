import React, { Component } from "react";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, Container } from "@chakra-ui/react";
import NavbarAdmin from "./NavbarAdmin";

class LayoutAdmin extends Component {
  render() {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" p={"10"}>
          <NavbarAdmin />
          {this.props.children}
          <Toaster />
        </Container>
      </ChakraProvider>
    );
  }
}

export default LayoutAdmin;
