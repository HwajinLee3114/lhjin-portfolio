import React from "react";
import styles from "./SlideButton.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface SlideButtonProps {
  text: string;
  href: string;
  color: string;
}

const SlideButton: React.FC<SlideButtonProps> = ({ text, href, color }) => {
  return (
    <div className={styles.wrapper}>
      <a className={`${styles.link} flex`} href={href} target="_blank">
        <div className={styles.color} style={{ backgroundColor: color }}></div>
        <span>{text}</span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="w-8 z-10"
          style={{ marginLeft: "0.5em"}}
        />
      </a>
    </div>
  );
};

export default SlideButton;
