import React from "react";
import styles from "../styles/components/Logo.module.css";

export default function Logo({ name, bold }) {
  return (
    <span className={`${styles.logo} ${bold && styles.bold}`}>{name}</span>
  );
}
