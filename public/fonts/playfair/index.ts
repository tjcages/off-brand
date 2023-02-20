import localFont from "@next/font/local";

const _ = localFont({
  src: [
    {
      path: "./Playfair.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Playfair-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});

export default _;
