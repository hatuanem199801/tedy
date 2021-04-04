import { serverHost } from "../configs/index";
import fetcher from "../libs/fetcher";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "./Logo";
import Link from "next/link";
import ShoppingCounter from "./ShoppingCounter";
import styles from "../styles/components/Navbar.module.css";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    fetcher(`${serverHost}/api/category`).then((result) => {
      if (result.status === 200) {
        setCategory(result.data);
      }
    });
  }, []);

  return (
    <nav
      className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-white py-4`}
    >
      <div className="container-md">
        <a className="navbar-brand pr-0 pb-0" href="/">
          <Logo name={"TEDY"} bold={true} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse collapse ${show && "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {categories &&
              categories.map((category) => (
                <li key={category._id} className="nav-item active">
                  <Link
                    href={{
                      pathname: "/loai-san-pham/[name]",
                      query: { name: category.title },
                    }}
                  >
                    <a className="nav-link" href={`/category/${name}`}>
                      {category.title}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
          <form className={`${styles.formSearch} form-inline my-2 my-lg-0`}>
            <div className="position-relative w-100">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Nhập tên sản phẩm"
                aria-label="Search"
              />
              <button
                className={`${styles.btnSearch} position-absolute btn btn-default my-2 my-sm-0 mr-2 mr-sm-1 px-2 py-1`}
                type="submit"
              >
                <AiOutlineSearch />
              </button>
            </div>
          </form>
          <div>
            <ShoppingCounter />
          </div>
        </div>
      </div>
    </nav>
  );
}
