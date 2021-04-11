import React, { Component } from "react";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, Container } from "@chakra-ui/react";

class LayoutAdmin extends Component {
  render() {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" p={"10"}>
          {this.props.children}
          <Toaster />
        </Container>
      </ChakraProvider>
    );
  }
}

export default LayoutAdmin;
