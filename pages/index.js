import Button from '@mui/material/Button';
import Head from 'next/head'
import Link from '@mui/material/Link';
import styles from '../styles/Home.module.css'
import { prepareAuthorizationURL } from '../lib/spotify.js'
import { withRouter } from 'next/router';
import { useAppContext } from '../context/appContext'

function Home() {
  const { auth, profile } = useAppContext()

  console.log(auth)
  console.log(profile)

  return (
    <div className={styles.container}>
      <Head>
        Commute Playlist Generator
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Let's create you a nice playlist to commute today!
        </h1>
        <Button variant="outlined">
          <Link href={prepareAuthorizationURL()}  >Sign in on Spotify</Link>
        </Button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          C'est la vie
        </a>
      </footer>
    </div>
  )
}

export default withRouter(Home);