import localFont from "next/font/local";

const _ = localFont({
  src: [
    {
      path: "./Moderat-Medium.otf",
      weight: "400",
      style: "normal"
    }
  ],
  variable: "--font-moderat"
});

export default _;
