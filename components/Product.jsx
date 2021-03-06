import React from "react";
import styles from "../styles/components/Product.module.css";
import formatMoney from "../libs/moneyFormat";
import Image from "next/image";
import PropTypes from "prop-types";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function Product(props) {
  const { seourl, name, image, price } = props;
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
            {image ? (
              <div className="d-block m-auto w-100">
                <Image
                  alt={name}
                  src={image}
                  className="img-product"
                  height={300}
                  width={208}
                  layout="responsive"
                />
              </div>
            ) : (
              <Skeleton height={240} width={140} alt={name} />
            )}
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
              {name || <Skeleton height={10} />}
            </div>
          </a>
        </Link>
        <div alt={name} className={styles.price}>
          {(price && formatMoney(price)) || <Skeleton height={10} />}
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
