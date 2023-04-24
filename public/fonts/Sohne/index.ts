import localFont from "next/font/local";

const untitledSerif = localFont({
  src: [
    {
      path: "./Sohne-Buch.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Sohne-BuchKursiv.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Sohne-Halbfett.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Sohne-HalbfettKursiv.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Sohne-Kraftig.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Sohne-KraftigKursiv.otf",
      weight: "600",
      style: "italic",
    },
  ],
});

export default untitledSerif;
