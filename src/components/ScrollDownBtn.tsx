import React from "react";

export default function ScrollDownBtn() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="box">
        <span className="animation-delay-0"></span>
        <span className="animation-delay-200"></span>
        <span className="animation-delay-400"></span>
      </div>
    </div>
  );
}

const styles = `
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box span {
  display: block;
  width: 20px;
  height: 20px;
  border-bottom: 3px solid skyblue;
  border-right: 3px solid skyblue;
  transform: rotate(45deg);
  margin: -10px;
  animation: animate 2s infinite;
}

.box span:nth-child(2) {
  animation-delay: -0.2s;
}

.box span:nth-child(3) {
  animation-delay: -0.4s;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}
`;

const injectStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

injectStyles();
