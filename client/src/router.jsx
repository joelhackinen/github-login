import { createBrowserRouter, redirect, defer } from "react-router-dom";
import App from "./App.jsx";
import Profile from "./Profile.jsx";
import Main from "./Main.jsx";

const tokenClosure = (() => {
  let githubAccessToken;

  const setToken = (token) => {
    githubAccessToken = token;
  };

  return {
    set: (token) => {
      setToken(token);
    },
    remove: () => {
      setToken(undefined);
    },
    get: () => {
      return githubAccessToken;
    },
  };
})();

const githubCallbackLoader = async ({ request }) => {
  const url = new URL(request.url);
  const codeParam = url.searchParams.get("code");
  const res = await fetch(`/api/github/getAccessToken?code=${codeParam}`);
  tokenClosure.set((await res.json()).access_token);
  return redirect("/profile");
};

const profileLoader = async () => {
  if (!tokenClosure.get()) {
    return redirect("/");
  }

  const userResponse = await fetch("/api/github/getUser", {
    headers: {
      Authorization: `Bearer ${tokenClosure.get()}`,
    },
  });

  const user = await userResponse.json();
  const reposData = fetch(user.repos_url);

  return defer({
    user,
    repos: reposData.then((res) => res.json()),
  });
};

const logoutAction = () => {
  tokenClosure.remove();
  return redirect("/");
};

const loginAction = () => {
  return redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLIENT
    }`,
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div className="text-sky-500">moro</div>,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/profile",
        loader: profileLoader,
        element: <Profile />,
      },
      {
        path: "/github/callback/*",
        loader: githubCallbackLoader,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "/login",
    action: loginAction,
  },
]);

export default router;
