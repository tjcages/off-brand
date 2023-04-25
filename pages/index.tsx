import styles from "@/styles/home.module.scss";
import data from "@/data";

import SEO from "@/seo";
import Guides from "@/components/Guides";
import Header from "@/components/Header";
import Stickers from "@/components/Stickers";
import Intro from "@/components/Intro";
import Container from "@/components/Container";
import Item from "@/components/Item";
import CTA from "@/components/CTA";

const live = true;

export default function Home() {
  return (
    <>
      <SEO />
      
      <main className={styles.main}>
        <Guides />
        <Stickers live={live} />

        <Header />
        <div className={styles.container}>
          <Intro />
          <Container>
            {data.map((item, index) => (
              <Item key={index} {...item} />
            ))}
            <CTA />
          </Container>
        </div>
      </main>
    </>
  );
}
