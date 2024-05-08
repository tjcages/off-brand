export const seo = {
  title: "Totem",
  description: "A new format of music",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico"
    }
  ],
  openGraph: {
    type: "website",
    url: "https://totem.info",
    title: "Totem",
    description: "A new format of music",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Totem Preview"
      }
    ]
  },
  twitter: {
    site: "@_totem__",
    card: "summary_large_image"
  },
  other: {
    "og:video": "/preview.mp4"
  }
};
