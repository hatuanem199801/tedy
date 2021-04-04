import React from "react";
import styles from "../styles/components/Product.module.css";
import formatMoney from "../libs/moneyFormat";
import Image from "next/image";
import PropTypes from "prop-types";
import Link from "next/link";

export default function Product(props) {
  const { seourl, name, image, price, _id } = props;
  return (
    <div className={styles.product}>
      <div className={styles.image}>
        <Link
          href={{
            pathname: "/[seourl]",
            query: { seourl },
          }}
        >
          <a href={`/${seourl}`}>
            <Image
              alt={name}
              src={image}
              width={380}
              height={380}
              layout="responsive"
            />
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <Link
          href={{
            pathname: "/[seourl]",
            query: { seourl },
          }}
        >
          <a href={`/${seourl}`}>
            <div title={name} className={styles.name}>
              {name}
            </div>
          </a>
        </Link>
        <div alt={name} className={styles.price}>
          {price && formatMoney(price)}
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};
