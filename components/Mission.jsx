import Image from "next/image";
import React from "react";
import styles from "../styles/components/Mission.module.css";
import bastStyles from "../styles/components/ListProductBaseCategory.module.css";

export default function Mission() {
  return (
    <div className={bastStyles.listCategory}>
      <h2 className={styles.title}>{"Mục tiêu của chúng tôi"}</h2>
      <hr />
      <div className={styles.mission}>
        <Image
          src="/mission-bạckground.png"
          height={480}
          width={1080}
          layout="responsive"
          alt="Nhiệm vụ của MyMy"
        />
        <div className={styles.box}>
          <span>
            {`MANG ĐẾN SỰ TỰ TIN CHO CÁNH 
              PHỤ NỮ KHI XUẤT HIỆN Ở MỌI 
              NƠI KHI KHOÁT LÊN MÌNH
              BỘ CÁNH CỦA TEDY.`}
          </span>
          <br />
          <br />
          <strong>CHÚNG TÔI TỰ HÀO KHI BẠN THỰC SỰ TOẢ SÁNG.</strong>
        </div>
      </div>
    </div>
  );
}
