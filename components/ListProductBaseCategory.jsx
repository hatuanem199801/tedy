import React, { useEffect, useState } from "react";
import ProductItem from "../components/Product";
import PropTypes from "prop-types";
import { serverHost } from "../configs/index";
import fetcher from "../libs/fetcher";
import styles from "../styles/components/ListProductBaseCategory.module.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import Link from "next/link";

export default function ListProductBaseCategory({ category, name }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetcher(`${serverHost}/api/product/category/${category}/10`).then(
      (result) => {
        if (result.status === 200 && result.data) {
          setProducts(result.data);
        }
      }
    );
  }, []);

  return (
    <div className={styles.listCategory}>
      <div className="d-flex justify-content-between">
        <h2 className={styles.title}>{name}</h2>
        <Link
          href={{
            pathname: `/loai-san-pham/[name]`,
            query: { name: category },
          }}
          className={styles.moreLink}
        >
          <a>
            <span className="mr-1">
              <AiOutlineEllipsis />
            </span>
            Xem thêm
          </a>
        </Link>
      </div>
      <div className="list-category-item">
        <div className="row mx-0">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="col-6 col-md-2 col-sm-3 col-md-4 col-lg-2 px-0 mb-2"
              >
                <ProductItem image={product.images[0]} {...product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

ListProductBaseCategory.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
