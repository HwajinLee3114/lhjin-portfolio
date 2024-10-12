import React from 'react';
import styles from './DepthButton.module.css';

interface DepthButtonProps {
  text: string;
  className?: string;
}

const DepthButton: React.FC<DepthButtonProps> = ({ text, className = '' }) => {
  return (
    <button className={`${styles.g_depth_button} ${className}`}>
      {text}
    </button>
  );
};

export default DepthButton;
