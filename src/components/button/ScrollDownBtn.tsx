"use client";

import React from "react";
import styles from "./ScrollDownBtn.module.css";
export default function ScrollDownBtn() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className={styles.box}>
        <span className="animation-delay-0"></span>
        <span className="animation-delay-200"></span>
        <span className="animation-delay-400"></span>
      </div>
    </div>
  );
}
