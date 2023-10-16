import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="fixed top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-2xl">
          Just testing the GitHub API and Tailwindcss
        </h1>
        <Link
          to={`https://github.com/login/oauth/authorize?client_id=${
            import.meta.env.VITE_GITHUB_CLIENT
          }`}
          className="border-2 dark:border-sky-500 border-sky-950 rounded-lg hover:font-semibold"
        >
          Log in with GitHub!
        </Link>
      </div>
    </div>
  );
};

export default Main;
