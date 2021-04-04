import Image from "next/image";
import React from "react";
import baseStyleCategory from "../styles/components/ListProductBaseCategory.module.css";
import baseStyleMission from "../styles/components/Mission.module.css";

export default function FollowUs() {
  return (
    <div className={baseStyleCategory.listCategory}>
      <h2 className={baseStyleMission.title}>{`Theo dõi chúng tôi`}</h2>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="mr-3">
          <Image src="/facebook.jpg" height={50} width={50} layout="fixed" />
        </div>
        <div className="mr-3">
          <Image src="/youtube.jpg" height={50} width={50} layout="fixed" />
        </div>
        <div className="ml-3">
          <Image src="/zalo.jpg" height={50} width={50} layout="fixed" />
        </div>
      </div>
    </div>
  );
}
