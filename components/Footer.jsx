import Image from "next/image";
import React from "react";
import styles from "../styles/components/Footer.module.css";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="row pt-4 p-2 px-sm-4 mx-0">
        <div className="col-12 col-sm-3">
          <h2 className={styles.title}>{`Hỗ trợ khách hàng`}</h2>
          <p className="text-danger">
            {`HOTLINE CHĂM SÓC KHÁCH HÀNG - `}
            <a
              href="tel:0777069014"
              className="text-danger"
            >{`0777.069.014`}</a>
          </p>
          <ul className={styles.list}>
            <li>
              <a href="/feedback">{`GỬI PHẢN HỒI TỪ KHÁCH HÀNG`}</a>
            </li>
            <li>
              <a href="/delivery">{`PHƯƠNG THỨC VẬN CHUYỂN`}</a>
            </li>
            <li>
              <a href="mailto:hte.media98gmail.com?subject=Bạn+có+ý+kiến+gì+dành+cho+chúng+tôi&body=...">{`EMAIL: mymy.fshop@gmail.com`}</a>
            </li>
            <li>
              <a href="tel:0945906633">{`SĐT: 0945 90 66 33`}</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-sm-3">
          <h2 className={styles.title}>{`VỀ MYMY`}</h2>
          <ul className={styles.list}>
            <li>
              <a href="/feedback">{`GIỚI THIỆU VỀ MYMY`}</a>
            </li>
            <li className="mt-4">
              <a href="/">
                <Logo name={"MYMY"} bold={true} />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-sm-3">
          <h2 className={styles.title}>{`PHƯƠNG THỨC THANH TOÁN`}</h2>
          <ul className="d-inline-flex list-unstyled mt-3 align-baseline">
            <li className="mr-3">
              <Image
                src="/money.jpg"
                alt="Thanh toán bằng tiền mặt"
                height={28}
                width={50}
                layout="fixed"
              />
            </li>
            <li className="mr-3">
              <Image
                src="/banking.jpg"
                alt="Thanh toán qua thẻ ngân hàng"
                height={28}
                width={50}
                layout="fixed"
              />
            </li>
            <li className="ml-3 my-auto">
              <Image
                src="/sacombank.jpg"
                height={25}
                width={100}
                alt="Thanh toán qua Sacombank"
                layout="fixed"
              />
            </li>
          </ul>
        </div>
        <div className="col-12 col-sm-3">
          <h2 className={styles.title}>{`Theo dõi chúng tôi`}</h2>
          <div className="d-flex justify-content-start">
            <div className="mr-3">
              <Image
                src="/facebook.jpg"
                height={25}
                width={25}
                alt="facebook"
                layout="fixed"
              />
            </div>
            <div className="mr-3">
              <Image
                src="/youtube.jpg"
                alt="youtube"
                height={25}
                width={25}
                layout="fixed"
              />
            </div>
            <div className="ml-3">
              <Image
                src="/zalo.jpg"
                alt="zalo"
                height={25}
                width={25}
                layout="fixed"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <a
          href="https://www.google.com/maps/place/MyMy+Shop/../10.6620022,106.5744616,19.25z/data=!4m13!1m7!3m6!1s0x31753309e384e9d7:0x68ae180ec0df1a3!2zxJBpbmggxJDhu6ljIFRoaeG7h24sIHguIELDrG5oIENow6FuaCwgQsOsbmggQ2jDoW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!3b1!8m2!3d10.6604361!4d106.5773086!3m4!1s0x0:0x81cae2e4b6befbad!8m2!3d10.6618152!4d106.5747793"
          target="_new"
        >
          <strong>{`ĐỊA CHỈ CỬA HÀNG:`}</strong>{" "}
          <span>{`C36, ĐƯỜNG ĐINH ĐỨC THIỆN, XÃ
          BÌNH CHÁNH, HUYỆN BÌNH CHÁNH, TP. HCM.`}</span>
          <span className="text-primary">
            {" >> Nhấp vào để xem trên Bản đồ"}
          </span>
        </a>
        <div>
          {`MYMY nhận đặt hàng trực tuyến và giao hàng tận nơi, hỗ trợ mua và nhận hàng trực tiếp tại cửa hàng.`}
        </div>
      </div>
      <div className={styles.copyright}>
        <span>{`© 2020 - Bản quyền của MYMY Media - mymysaigon.com`}</span>
        <div>
          <a href="/">
            <Logo name={"MYMY"} bold={true} />
          </a>
        </div>
      </div>
    </footer>
  );
}
