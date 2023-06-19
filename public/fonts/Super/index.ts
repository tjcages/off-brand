import localFont from "next/font/local";

const _ = localFont({
  src: [
    {
      path: "./GTSuperDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--gt-super"
});

export default _;
