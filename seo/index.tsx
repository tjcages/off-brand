import { useEffect, useState } from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const _ = ({
  title = "Stripe | Try a buy button",
  description = "The fastest way to add Stripe to your site. Easily turn any payment link into an embeddable buy button.",
  image = "https://tryabuybutton.com/preview.jpg",
  url = "https://tryabuybutton.com",
}: Props) => {
  const [faviconHref, setFaviconHref] = useState("/favicon.ico");

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  const getFaviconPath = (isDarkMode = false) => {
    return isDarkMode ? "/favicon.ico" : "/favicon.ico";
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} key="title" />
      <meta name="og:title" content={title} key="og:title" />
      <meta property="og:site_name" content={title} />
      <meta name="description" content={description} key="description" />
      <meta name="og:description" content={description} key="og:description" />
      <meta property="og:url" content={url} key="url" />
      <meta property="og:image" content={image} key="image" />
      {/* Twit */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="https://nategagnon.com" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@NateyG" />

      <link rel="icon" href={faviconHref} />
    </Head>
  );
};

export default _;
