import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="fixed left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">
          Just testing the GitHub API and Tailwindcss
        </h1>
        <Link
          to={`https://github.com/login/oauth/authorize?client_id=${
            import.meta.env.VITE_GITHUB_CLIENT
          }`}
          className="flex items-center justify-center rounded-lg border-2 border-sky-950 hover:font-semibold dark:border-sky-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <span>Log in with GitHub!</span>
        </Link>
      </div>
    </div>
  );
};

export default Main;
