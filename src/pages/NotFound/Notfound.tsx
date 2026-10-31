import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-orbit-ink flex items-center justify-center px-4 text-center">

      <div className="max-w-lg">

        <h1 className="text-[140px] sm:text-[180px] font-extrabold leading-none
          text-transparent bg-clip-text bg-gradient-to-r
          from-orbit-violet to-purple-400 drop-shadow-lg">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-6">
          Lost in Orbit?
        </h2>

        <p className="text-gray-400 mt-4 leading-relaxed">
          Looks like this page has drifted into space.
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-8 px-7 py-3
          rounded-xl bg-orbit-violet text-white font-semibold
          hover:bg-orbit-violet transition-all duration-300
          hover:-translate-y-1"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

      </div>

    </section>
  );
}