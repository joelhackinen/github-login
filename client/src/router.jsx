import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App.jsx';
import Profile from './Profile.jsx';
import Main from './Main.jsx';

const tokenClosure = (() => {
  let githubAccessToken;

  const setToken = (token) => {
    githubAccessToken = token;
  };

  return {
    set: (token) => {
      setToken(token);
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

  let res1 = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${tokenClosure.get()}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const userData = await res1.json();
  const res2 = await fetch(userData.repos_url);
  const reposData = await res2.json();

  return { user: userData, repos: reposData };
};

const logoutAction = () => {
  tokenClosure.set(undefined);
  return redirect("/");
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>moro</div>,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/profile',
        loader: profileLoader,
        element: <Profile />
      },
      {
        path: '/github/callback/*',
        loader: githubCallbackLoader,
      },
    ],
  },
  {
    path: '/logout',
    action: logoutAction,
  }
]);

export default router;