import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  large: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  medium: {
    breakpoint: { max: 1024, min: 576 },
    items: 4,
  },
  small: {
    breakpoint: { max: 576, min: 0 },
    items: 3,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function ScrollCarousel({ children }: Props) {
  return (
    <Carousel className="w-full" responsive={responsive}>
      {children}
    </Carousel>
  );
}
