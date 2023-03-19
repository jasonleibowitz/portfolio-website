import Head from 'next/head';
import { Button } from 'ui';

export default function Web() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen y-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div>
          <h1>Web (with TailWind) v2</h1>
          <Button />
        </div>
        <div className="bg-yellow-200 h-12 w-12" />
      </main>
    </div>
  );
}
