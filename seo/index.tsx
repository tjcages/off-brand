import { useState, useEffect } from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  url?: string;
  theme?: string;
}

const _ = ({
  title = "Off–Brand",
  description = "A Creative Studio, NYC",
  image = "https://off-brand.studio/preview.png",
  video = "https://off-brand.studio/preview.mp4",
  url = "https://off-brand.studio",
  theme = "#080808",
}: Props) => {
  const [faviconHref, setFaviconHref] = useState("/favicon-dark.ico");

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  const getFaviconPath = (isDarkMode = false) => {
    return isDarkMode ? "/favicon.ico" : "/favicon-dark.ico";
  };

  return (
    <Head>
      {/* favicon */}
      <link rel="icon" type="image/x-icon" href={faviconHref} />
      {/* disable auto phone number detection */}
      <meta name="format-detection" content="telephone=no" />
      {/* metadata */}
      <title>{title}</title>
      <meta name="title" content={title} key="title" />
      <meta name="og:title" content={title} key="og:title" />
      <meta property="og:site_name" content={title} />
      <meta name="description" content={description} key="description" />
      <meta name="og:description" content={description} key="og:description" />
      <meta property="og:url" content={url} key="url" />
      <meta property="og:image" content={image} key="image" />
      <meta property="og:video" content={video} key="video" />
      {/* twit 🤮 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="https://cosmos.so" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@tjcages" />
      {/* theme */}
      <meta name="theme-color" content={theme} />
    </Head>
  );
};

export default _;
