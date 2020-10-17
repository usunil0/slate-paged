import styles from '../styles/Home.module.css'
import Notes from '../notes'

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Notes />
      </div>
    </div>
  )
}
