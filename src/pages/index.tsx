import Notes from '../notes'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Notes />
      </div>
    </div>
  )
}
