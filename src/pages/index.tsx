import styles from './index.less';
import Game from './js/game.jsx';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Game />
    </div>
  );
}
