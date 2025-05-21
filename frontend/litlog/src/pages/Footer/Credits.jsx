import React from 'react';
import styles from './FooterPage.module.css';

const Credits = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>CREDITS</h2>
        <hr className={styles.pageDivider} />
      </div>

      <h1 className={styles.title}>Team Book Fox</h1>
      <p className={styles.paragraph2}>
        LitLog was collaboratively planned and developed by four full-stack developers from Team Book Fox.<br />
        Each developer actively contributed to both the frontend and backend throughout the project.
      </p>
      <ul className={styles.list2}>
        <li><strong>Minjeong Kwon</strong> | <a href="mailto:dried021@gmail.com">dried021@gmail.com</a></li>
        <li><strong>Seunghyun Nam</strong> | <a href="mailto:shyunam@gmail.com">shyunam@gmail.com</a></li>
        <li><strong>Nahye Park</strong> | <a href="mailto:pnhmms@gmail.com">pnhmms@gmail.com</a></li>
        <li><strong>Sunho Yun</strong> | <a href="mailto:sunho23580gmail.com">sunho23580gmail.com</a></li>
      </ul>

      <h1 className={styles.title}>Technology Stack</h1>
      <ul className={styles.list2}>
        <li><strong>Frontend</strong> React 19, Vite, React Router DOM, Redux Toolkit, Zustand, MUI, Emotion, Styled Components, Axios</li>
        <li><strong>UI Components</strong> Bootstrap 5, React-Bootstrap, React Select, React Slick, React Icons, Lucide React</li>
        <li><strong>Backend</strong> Spring Boot 3.4.5, Spring Web, Spring Data JPA, MyBatis, Spring Mail, Spring Boot DevTools, Lombok</li>
        <li><strong>Database</strong> MySQL</li>
        <li><strong>Environment</strong> dotenv-java, Maven, Java 17</li>
        <li><strong>API Integration</strong> Google Books API</li>
      </ul>


      <h1 className={styles.title}>Contact</h1>
      <p className={styles.paragraph2}>
        For General Inquiries, please contact us at <a href="mailto:teambookfox@litlog.com">teambookfox@litlog.com</a>
      </p>
    </div>
  );
};

export default Credits;
