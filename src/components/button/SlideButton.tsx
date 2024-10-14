"use client";

import React from "react";
import styles from "./SlideButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface SlideButtonProps {
  text: string;
  href?: string; // href를 선택적으로 수정
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
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDown && url) {
      event.preventDefault(); // 기본 동작 방지
      const link = document.createElement("a");
      link.href = url;
      link.download = ""; // 다운로드 속성 추가
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (href) {
      // href가 있을 경우에만 페이지 이동
      window.open(href, "_blank");
      event.preventDefault(); // 기본 동작 방지
    }
  };

  return (
    <div className={`${styles.wrapper} cursor-pointer`}>
      <a
        className={`${styles.link} flex items-center`}
        href={href}
        target="_blank"
        onClick={handleClick}
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
