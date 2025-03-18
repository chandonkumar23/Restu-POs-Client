import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 py-8 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
            RestuPOS.
          </span>{" "}
          <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
            System
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-center text-gray-700 dark:text-gray-300 text-lg md:text-xl">
          Seamless POS solutions for modern businesses. Efficient, intuitive, and reliable.
        </p>

        <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-center">
          <Link
            to="/OpenPage"
            className="px-6 py-3 text-sm md:text-base font-medium tracking-wide text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition"
          >
            Open System
          </Link>
        </div>
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by RoomLess Ltd</p>
                </aside>
            </footer>
    </section>
  );
};

export default Home;
