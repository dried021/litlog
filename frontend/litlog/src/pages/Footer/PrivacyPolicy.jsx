import React from 'react';
import styles from './FooterPage.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>PRIVACY POLICY</h2>
        <hr className={styles.pageDivider} />
      </div>

      <ol className={`${styles.orderedList} ${styles.paragraph}`}>
        <li>
          <strong>Your privacy:</strong> LitLog is committed to protecting your personal information and respecting your privacy rights.
        </li>
        <li>
          <strong>Application:</strong> This Privacy Policy applies to all personal information submitted by users through litlog.app (the “Website”) and any related service operated by the Book Fox Team.
        </li>
        <li>
          <strong>Consent:</strong> By creating a LitLog account and using the Website, you agree to the collection, use, storage, and processing of your information in accordance with this Privacy Policy.
        </li>
        <li>
          <strong>Changes to Privacy Policy:</strong> We may update this Privacy Policy at any time, with or without notice. Continued use of LitLog constitutes acceptance of the revised policy in effect.
        </li>
        <li>
          <strong>Personal information:</strong> We collect email address, password, and phone number to create and manage user accounts. Optional profile data such as display name and bio may also be stored. We do not collect birthdate, gender, address, or social media data.
        </li>
        <li>
          <strong>Cookies:</strong> LitLog uses basic session cookies to keep you signed in and ensure platform functionality. These cookies are not used for advertising or tracking purposes. Disabling cookies may affect certain features.
        </li>
        <li>
          <strong>Advertising privacy:</strong> LitLog does not display ads or use advertising-related trackers. No personal data is shared with advertisers.
        </li>
        <li>
          <strong>Log data:</strong> We automatically collect data such as your IP address, browser type, OS, referring pages, and access times to improve service quality, prevent abuse, and ensure stability.
        </li>
        <li>
          <strong>Payment information:</strong> LitLog does not offer paid services and does not collect or store any payment-related information.
        </li>
        <li>
          <strong>Use of information:</strong> Your personal data is used solely to operate and improve the platform, support your account, and maintain a safe reading community.
        </li>
        <li>
          <strong>Disclosure of information:</strong> We do not share your personal information with any third parties. Book metadata is provided via Google Books API without user data being exposed.
        </li>
        <li>
          <strong>Access to and updates of information:</strong> You may access, edit, or delete your information at any time via your account settings. Administrators may also remove user content in case of policy violations.
        </li>
        <li>
          <strong>Storage of information:</strong> All personal data is stored securely on our servers. Your data will not be transferred to or processed in foreign jurisdictions.
        </li>
        <li>
          <strong>Global operations and Privacy Shield:</strong> LitLog does not operate globally at this time and does not rely on cross-border data transfers. No external privacy shields apply.
        </li>
        <li>
          <strong>Retention:</strong> Your information is retained only as long as necessary for service provision or as required by law. Upon deletion, most data is fully removed from our systems except for anonymized identifiers.
        </li>
        <li>
          <strong>Deactivation and deletion:</strong> You may request to delete your account at any time. Deleted accounts cannot be restored. All reviews, likes, comments, and associated content will be permanently erased.
        </li>
        <li>
          <strong>Portability:</strong> LitLog currently does not provide automatic data export functionality. If needed, data access may be requested by contacting the team.
        </li>
        <li>
          <strong>Security:</strong> We implement industry-standard security practices including encryption, access control, and monitoring. Users are responsible for keeping their login credentials secure.
        </li>
        <li>
          <strong>Captcha:</strong> LitLog does not use CAPTCHA or external bot detection frameworks.
        </li>
      </ol>

      <p className={styles.paragraph4}>
        For any questions regarding this Privacy Policy, please contact us at <a href="mailto:teambookfox@litlog.com">teambookfox@litlog.com</a><br />
        <em>This Policy was last updated in May 2025 and is Effective Immediately.</em>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
