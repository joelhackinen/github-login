import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App.js';
import Projects from './Projects.js';

let githubAccessToken;

const githubCallbackLoader = async ({ request }) => {
  const url = new URL(request.url);
  const codeParam = url.searchParams.get("code");
  const res = await fetch(`/api/github/getAccessToken?code=${codeParam}`);
  githubAccessToken = (await res.json()).access_token;
  return redirect("/");
};

const appLoader = async () => {
  if (!githubAccessToken) {
    return null;
  }

  let res;
  try {
    res = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${githubAccessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  } catch (e) {
    return null;
  }
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
      },
    ]
  },
  {
    path: '/github/callback/*',
    loader: githubCallbackLoader,
  },
]);

export default router;