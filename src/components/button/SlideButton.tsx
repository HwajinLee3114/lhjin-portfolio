"use client";

import React from "react";
import styles from "./SlideButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface SlideButtonProps {
  text: string;
  href?: string;
  color: string;
  isDown?: boolean; // 다운로드 여부
  url?: string; // 다운로드 URL
}

const SlideButton: React.FC<SlideButtonProps> = ({
  text,
  href,
  color,
  isDown,
  url,
}) => {
  const lf_slideBtnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDown && url) {
      event.preventDefault();
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (href) {
      window.open(href, "_blank");
      event.preventDefault();
    }
  };

  return (
    <div className={`${styles.wrapper} cursor-pointer`}>
      <a
        className={`${styles.link} flex items-center`}
        href={href}
        target="_blank"
        onClick={lf_slideBtnClick}
      >
        <div className={styles.color} style={{ backgroundColor: color }}></div>
        <span>{text}</span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="w-8 z-10 ml-2"
        />
      </a>
    </div>
  );
};

export default SlideButton;
