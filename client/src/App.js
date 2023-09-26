import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam && !localStorage.getItem("access_token")) {
      fetch(`http://localhost:8080/api/github/getAccessToken?code=${codeParam}`)
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            localStorage.setItem("access_token", data.accessToken)
          }
        })
    }
  }, []);

  const loginGithub = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT}`);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
  };

  return (
    <div>
      <h1>Moro!</h1>
      {localStorage.getItem("access_token") ?
        <div>
          <h1>Access token found</h1>
          <button onClick={logout}>Logout</button>
        </div>
        :
          <button onClick={loginGithub}>Login with Github</button>
      }
    </div>
  )
};

export default App;