import React from 'react';
import styles from './FooterPage.module.css';

const Terms = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>TERMS OF SERVICE</h2>
        <hr className={styles.pageDivider} />
      </div>

      <p className={styles.paragraph3}>
        By accessing and using litlog.app and any other site, application, or API operated by the Book Fox Team (the “Service”), 
        you accept and agree to be bound by the following terms and conditions (“Terms”).
      </p>

      <ol className={`${styles.orderedList} ${styles.paragraph}`}>
        <li>
          <strong>Use:</strong> You may only use LitLog in accordance with these Terms. All rights not expressly granted to you are reserved by the Book Fox Team.
        </li>
        <li>
          <strong>Responsibility:</strong> You are responsible for all activity under your LitLog account. We disclaim any and all liability for user-generated content.
        </li>
        <li>
          <strong>Provision of Information:</strong> You must be at least 14 years of age to use LitLog. You agree to provide accurate and current information, and to keep your account up to date.
        </li>
        <li>
          <strong>Community Policy:</strong> You must be respectful toward others. Do not post harmful, harassing, or offensive remarks. We reserve the right to moderate harmful behavior.
        </li>
        <li>
          <strong>Conduct:</strong> You may not promote hate, violence, or discrimination. Manipulation of reviews, spamming, or deceptive behavior is prohibited. Off-platform behavior may also be considered in moderation.
        </li>
        <li>
          <strong>No Malicious Use:</strong> Do not abuse, impersonate, harass, or threaten other users. Do not file false reports or misuse moderation systems. These actions may result in account suspension.
        </li>
        <li>
          <strong>No Illegal Use:</strong> Do not post illegal content or violate the rights of others, including intellectual property rights. Content that exploits or endangers children is strictly prohibited and will be reported as required by law.
        </li>
        <li>
          <strong>Removal of Content:</strong> We reserve the right to remove content that violates these Terms, including offensive, misleading, or harmful material.
        </li>
        <li>
          <strong>Intellectual Property:</strong> All intellectual property related to LitLog belongs to the Book Fox Team. You retain ownership of your content, but grant us the right to display it on LitLog. Do not post plagiarized or infringing content.
        </li>
        <li>
          <strong>Indemnity:</strong> You agree to indemnify and hold harmless LitLog and the Book Fox Team from any claims or liabilities resulting from your use of the Service.
        </li>
        <li>
          <strong>Amendments:</strong> We may revise these Terms at any time. Continued use of LitLog indicates acceptance of the updated Terms.
        </li>
        <li>
          <strong>Use of Logo:</strong> You may not use the LitLog name, branding, or logo without written permission. You may not alter, misuse, or associate our branding with harmful or misleading content.
        </li>
        <li>
          <strong>Third-party Applications:</strong> LitLog integrates book metadata via the Google Books API. We are not responsible for external services or their content.
        </li>
        <li>
          <strong>Termination or Suspension of Accounts:</strong> We may suspend or terminate your account if you violate these Terms or act in a way that harms the community.
        </li>
        <li>
          <strong>Technical Support and Malfunctions:</strong> We aim to address technical issues promptly, but are not liable for downtime, service interruptions, or data loss.
        </li>
        <li>
          <strong>Governing Law and Jurisdiction:</strong> These Terms are governed by the laws of the Republic of Korea. Any disputes shall be subject to the exclusive jurisdiction of the courts of Seoul, Korea.
        </li>
      </ol>

      <p className={styles.paragraph4}>
        For any questions regarding our Terms of Service, please contact us at <a href="mailto:teambookfox@litlog.com">teambookfox@litlog.com</a><br />
        <em>This Policy was last updated in May 2025 and is Effective Immediately.</em>
      </p>
    </div>
  );
};

export default Terms;
