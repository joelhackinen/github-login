import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App.jsx';
import Projects from './Projects.jsx';

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

let reposUrl;

const githubCallbackLoader = async ({ request }) => {
  const url = new URL(request.url);
  const codeParam = url.searchParams.get("code");
  const res = await fetch(`/api/github/getAccessToken?code=${codeParam}`);
  tokenClosure.set((await res.json()).access_token);
  return redirect("/");
};

const appLoader = async () => {
  if (!tokenClosure.get()) {
    return null;
  }

  let res;
  try {
    res = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${tokenClosure.get()}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  } catch (e) {
    return null;
  }
  const data = await res.json();
  reposUrl = data.repos_url;
  return data;
};

const projectsLoader = async () => {
  if (!reposUrl) return redirect("/");

  const res = await fetch(reposUrl);
  return res;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'root',
    loader: appLoader,
    children: [
      {
        path: '/projects',
        element: <Projects />,
        loader: projectsLoader,
      },
    ]
  },
  {
    path: '/github/callback/*',
    loader: githubCallbackLoader,
  },
]);

export default router;