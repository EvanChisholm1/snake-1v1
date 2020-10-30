import Head from 'next/head';
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Snake 1v1</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Welcome to Snake 1v1</h1>
      <p>
        Snake 1v1 is a place where you can 1v1 your friends in snake.
        The person with the most points at the end of a round wins.
      </p>
      <Link href="/createroom">Want to create a game? Click here.</Link>
      <br />
      <Link href="/joingame">Have a code? Click here.</Link>
    </div>
  );
}
