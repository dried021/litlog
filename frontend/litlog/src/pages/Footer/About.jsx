import React from 'react';
import styles from './FooterPage.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>ABOUT LITLOG</h2>
        <hr className={styles.pageDivider} />
      </div>

      <h1 className={styles.title}>What is LitLog?</h1>
      <p className={styles.paragraph}>
        LitLog is a social reading network for people who love books and the conversations they spark. 
        It’s a place where readers can track their reading journey, document reflections, and share insights with a like-minded community. 
        Whether you're looking to keep a log of finished books, review titles you've loved (or didn’t), 
        or discover what others are reading, LitLog provides a space to deepen your reading life. 
        You can build a personal bookshelf, create themed collections, and engage with other readers through likes, comments, and follows. 
        At its heart, LitLog values not only the act of reading, but also the relationships and discoveries that grow from sharing what you read. 
        We aim to make books more than just solitary experiences — they become part of a shared journey.
      </p>

      <h1 className={styles.title}>How LitLog Started</h1>
      <p className={styles.paragraph}>
        LitLog began from a shared desire to create more meaningful conversations around books. Based on our own reading
        experiences, we envisioned a platform where expressing thoughts on books and exchanging ideas could feel natural
        and effortless.
      </p>

      <h1 className={styles.title}>Why is it called "LitLog"?</h1>
      <p className={styles.paragraph}>
        The name “LitLog” combines “Literature” and “Log”, representing a space where you record and reflect on your
        literary journey. It’s not just about finishing books — it’s about preserving the experience and sharing it with
        others.
      </p>

      <h1 className={styles.title}>How do I use LitLog?</h1>
      <p className={styles.paragraph2}>
        You can explore books, collections, and reviews without signing up. But to write reviews, add books to your shelf,
        or follow other readers, you’ll need an account.
      </p>
      <ul className={styles.list}>
        <li>Write reviews and rate books</li>
        <li>Organize your personal bookshelf</li>
        <li>Create and share themed collections</li>
        <li>Explore other users’ bookshelves and reviews</li>
        <li>Communicate through likes and comments</li>
      </ul>
    </div>
  );
};

export default About;
