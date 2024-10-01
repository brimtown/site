"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Ball.module.css";

interface BallProps {
  initialX?: number;
  initialY?: number;
  speed?: number;
}

const Ball: React.FC<BallProps> = ({
  initialX = 0,
  initialY = 0,
  speed = 2,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [velocity, setVelocity] = useState({ x: speed, y: speed });
  const ballRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setPosition((prevPosition) => {
        const boundingRect = ballRef.current?.getBoundingClientRect();
        if (!boundingRect) return prevPosition;

        let newX = prevPosition.x + velocity.x;
        let newY = prevPosition.y + velocity.y;
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        if (newX <= 0 || newX + boundingRect.width >= window.innerWidth) {
          newVelocityX = -newVelocityX;
          newX = newX <= 0 ? 0 : window.innerWidth - boundingRect.width;
        }

        if (newY <= 0 || newY + boundingRect.height >= window.innerHeight) {
          newVelocityY = -newVelocityY;
          newY = newY <= 0 ? 0 : window.innerHeight - boundingRect.height;
        }

        if (newVelocityX !== velocity.x || newVelocityY !== velocity.y) {
          setVelocity({ x: newVelocityX, y: newVelocityY });
        }

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity]);

  return (
    <div
      ref={ballRef}
      className={styles.ball}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};

export default Ball;
