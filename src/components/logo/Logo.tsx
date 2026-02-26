/**
 * Assets
 */
import { logo } from '@/assets';

/**
 * Styles
 */
import styles from './logo.module.css'

const Logo = ({title}: {title?: string}) => {
  return (
    <div className={styles.logo__container}>
      <img
        src={logo}
        alt="Tasky AI Logo"
        className={styles.logo_img}
      />
      {title}
    </div>
  );
};

export default Logo;
