import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  url?: string;
}

const _ = ({
  title = "COSMOS©",
  description = "A Pinterest alternative for creatives.",
  image = "/preview.jpg",
  video = "/preview.mp4",
  url = "https://cosmos.so",
}: Props) => {
  return (
    <Head>
      {/* favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
    </Head>
  );
};

export default _;
