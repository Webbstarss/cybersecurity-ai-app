import Head from 'next/head';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cybersäkerhets-Chattbot</title>
        <meta name="description" content="AI-driven cybersäkerhetschattbot med expertkunskap om 300 attacker och skydd." />
      </Head>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Välkommen till AI Chattbot för Cybersäkerhet
        </h1>
        <div className="w-full max-w-2xl">
          <Chatbot />
        </div>
      </main>
    </>
  );
}
