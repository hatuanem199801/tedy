import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/components/Slider.module.css";
import "react-slideshow-image/dist/styles.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import fetcher from "../libs/fetcher";
import { serverHost } from "../configs";
import { motion } from "framer-motion";

export default function EventSlider() {
  const [events, setEvents] = useState(null);
  let [slide, setSlide] = useState(0);

  useEffect(() => {
    fetcher(`${serverHost}/api/event`).then((result) => {
      if (result.status === 200) {
        setEvents(result.data);
      }
    });
  }, []);

  return (
    <motion.div
      className={styles.slider}
      initial={{
        opacity: 0,
        x: 1,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
      }}
    >
      {events &&
        events.map((item, index) => {
          return (
            <div
              key={item._id}
              className={`${styles.slideItem} ${
                index === slide ? styles.active : styles.hide
              }`}
            >
              <div className="d-flex justify-content-center">
                <Image
                  src={item.image}
                  layout="fill"
                  className={styles.slideImage}
                />
              </div>
              <div className={styles.slideTitle}>
                {item.title && (
                  <>
                    <span>{item.title}</span>
                    <p>{item.description}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      <div className={styles.slideControl}>
        <span
          className={styles.leftControl}
          onClick={() => {
            setSlide(slide > 0 ? --slide : 0);
          }}
        >
          <AiOutlineLeft size={20} color="white" />
        </span>
        <span
          className={styles.rightControl}
          onClick={() => setSlide(slide >= events.length - 1 ? 0 : ++slide)}
        >
          <AiOutlineRight size={20} color="white" />
        </span>
      </div>
      <div className={styles.dotsControl}>
        {events &&
          events.map((item, index) => {
            return (
              <div
                key={item._id}
                onClick={() => setSlide(index)}
                className={`${styles.dot} ${
                  slide === index ? styles.dotActive : null
                }`}
              ></div>
            );
          })}
      </div>
    </motion.div>
  );
}
