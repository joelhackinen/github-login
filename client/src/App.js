import { useLoaderData, Link, Outlet } from 'react-router-dom';

const App = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <div>
      <h1>Moro!</h1>
      {loaderData &&
        <div>
          Logged in as {loaderData.login}
          <Link to="/projects">Go to projects</Link>
        </div>}
      <div>
        <Link to={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT}`}>moro</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default App;