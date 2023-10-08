import { useLoaderData, Link, Outlet } from 'react-router-dom';

const App = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <div>
      <h1>Moro!</h1>
      {loaderData ?
        <div>
          <p>Logged in as {loaderData.login}</p>
          <Link to="/projects">Show projects</Link>
        </div>
        :
        <Link to={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT}`}>Log in with GitHub!</Link>
      }
      <Outlet />
    </div>
  );
};

export default App;