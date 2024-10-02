"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Ball.module.css";

interface BallProps {
  initialX?: number;
  initialY?: number;
  speed?: number;
  delay?: number;
}

const BALL_SIZE = 150;

const Ball: React.FC<BallProps> = ({
  initialX = 0,
  initialY = 0,
  speed = 2,
  delay = 0,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const delta = useRef({ x: 1, y: 1 });
  const animationRef = useRef<number>();
  const timeoutRef = useRef<number>();
  const clientRect = useRef(document.documentElement.getBoundingClientRect());

  useEffect(() => {
    const animate = () => {
      setPosition((prevPosition) => {
        let deltaX = delta.current.x;
        let deltaY = delta.current.y;
        clientRect.current = document.documentElement.getBoundingClientRect();

        if (prevPosition.x >= clientRect.current.width - BALL_SIZE) {
          deltaX = -1;
        } else if (prevPosition.x <= 0) {
          deltaX = 1;
        }

        if (prevPosition.y >= clientRect.current.height - BALL_SIZE) {
          deltaY = -1;
        } else if (prevPosition.y <= 0) {
          deltaY = 1;
        }

        delta.current = { x: deltaX, y: deltaY };

        return {
          x: prevPosition.x + speed * deltaX,
          y: prevPosition.y + speed * deltaY,
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    timeoutRef.current = window.setTimeout(
      () => (animationRef.current = requestAnimationFrame(animate)),
      delay
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, delay]);

  return (
    <div
      className={styles.ball}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};

export default Ball;
