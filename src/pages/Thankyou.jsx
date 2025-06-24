export default function ThankYou() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">Thank You! 🎉</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md">
        Your message has been sent successfully. I’ll get back to you as soon as possible.
      </p>
      <a
        href="/"
        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
      >
        🔙 Go Back to Home
      </a>
    </section>
  );
}
