import { Link, useLoaderData, useSubmit, Await } from "react-router-dom";
import { Suspense } from "react";
import ProjectList from "./ProjectList";

const Profile = () => {
  const { user, repos } = useLoaderData();
  const submit = useSubmit();

  return (
    <div className="flex flex-col gap-16 mx-6 mt-6">
      <div className="flex justify-between items-center gap-x-10">
        <div className="flex flex-nowrap items-center gap-x-3">
          <div className="flex-col">
            <div className="flex-0">{"logged in as"}</div>
            <div className="flex-0">
              <Link
                className="hover:underline font-semibold"
                to={user.html_url}
              >
                {user.login}
              </Link>
            </div>
          </div>
          <img
            className="w-10 h-10 rounded-full border-2 border-sky-500"
            src={user.avatar_url}
          />
        </div>
        <button
          className="hover:underline"
          onClick={() => submit(null, { method: "post", action: "/logout" })}
        >
          <div className="flex flex-nowrap gap-x-1 items-center">
            <span>log out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>
        </button>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={repos}>
          <ProjectList />
        </Await>
      </Suspense>
    </div>
  );
};

export default Profile;
