import styles from "@/styles/main.module.scss";

import Guides from "@/components/Guides";
import Nav from "@/components/Nav";
import Action from "@/components/Action";
import Stickers from "@/components/Stickers";
import Intro from "@/components/Intro";
import Container from "@/components/Container";
import Item from "@/components/Item";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Guides />
      <Stickers />

      <Nav />
      <div className={styles.container}>
        <Intro />
        <Container>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Container>
        <Footer />
      </div>
      <Action />
    </main>
  );
}
