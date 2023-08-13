import localFont from "next/font/local";

const _ = localFont({
  src: [
    {
      path: "./Ogg-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Ogg-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--ogg",
});

export default _;
