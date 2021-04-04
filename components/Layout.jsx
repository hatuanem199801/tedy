import React, { Component } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

class Layout extends Component {
  render() {
    return (
      <>
        <Navbar />
        {this.props.children}
        <Footer />
        <Toaster />
      </>
    );
  }
}

export default Layout;
