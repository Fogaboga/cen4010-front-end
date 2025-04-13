export default function Home() {
  return (
    <main className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to SkyCast</h1>
      <p className="mt-4 text-gray-600">Check your weather forecast with style.</p>
      <a href="/login" className="mt-6 inline-block text-blue-600 hover:underline">
        Go to Login
      </a>
      <br/>
      <a href="/registration" className="mt-6 inline-block text-blue-600 hover:underline">
        Make an acount
      </a>
    </main>
  );
}
