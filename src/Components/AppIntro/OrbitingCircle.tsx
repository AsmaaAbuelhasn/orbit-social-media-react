
import React from "react";
import type { ReactNode } from "react";

interface OrbitingCircleProps {
  children: ReactNode;
  radius?: number;
  duration?: number;
  reverse?: boolean;
  path?: boolean;
}

export default function OrbitingCircles({
  children,
  radius = 100,
  duration = 20,
  reverse = false,
  path = false,
}: OrbitingCircleProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {path && (
        <div className="absolute inset-0 rounded-full border border-white/20" />
      )}

      <div
        className="absolute inset-0"
        style={{
          animation: `orbit ${duration}s linear infinite ${
            reverse ? "reverse" : "normal"
          }`,
        }}
      >
        {React.Children.map(children, (child, index) => {
          const count = React.Children.count(children);
          const angle = (360 / count) * index;

          return (
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px)`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes orbit {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
