import styles from './index.less';
import Game from './js/game';
import './css/app.less';

export default function IndexPage() {
  return (
    <div className={styles.bg}>
      <Game />
    </div>
  );
}
