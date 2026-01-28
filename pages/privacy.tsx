import { useEffect } from "react";
import SEO from "@/seo";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/privacy.module.scss";

const Privacy = () => {
  useEffect(() => {
    document.body.style.cursor = "default";
  }, []);

  return (
    <>
      <SEO 
        title="Privacy Policy - Off Brand"
        description="Privacy policy for Off Brand Studio"
        theme="#060606" 
      />

      <main className={styles.main}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <Image src="/imgs/icons/ob.png" alt="logo" width={32} height={32} />
          </Link>
          <Link href="/" className={styles.back}>
            <h5>← Back</h5>
          </Link>
        </header>

        <div className={styles.content}>
          <h1 className={styles.title}>Privacy Policy</h1>
          
          <section>
            <h2>Information We Collect</h2>
            <p>
              Off Brand Studio ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you visit our website or engage with our services.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you 
              express an interest in obtaining information about us or our services, when you 
              participate in activities on our website, or when you contact us.
            </p>
            <ul>
              <li>To respond to your inquiries and provide customer service</li>
              <li>To send you marketing and promotional communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may 
              share your information with trusted service providers who assist us in operating 
              our website and conducting our business, as long as they agree to keep this 
              information confidential.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect 
              your personal information against unauthorized access, alteration, disclosure, or 
              destruction.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal 
              information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectification or erasure of your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>
          </section>

          <section>
            <h2>Cookies and Tracking</h2>
            <p>
              We may use cookies and similar tracking technologies to track activity on our 
              website and store certain information. You can instruct your browser to refuse 
              all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last 
              Updated" date.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:ty@off-brand.studio">ty@off-brand.studio</a><br />
              <strong>Website:</strong> <a href="https://off-brand.studio">https://off-brand.studio</a>
            </p>
          </section>

          <div className={styles.footer}>
            <p className={styles.updated}>Last Updated: January 27, 2026</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Privacy;
