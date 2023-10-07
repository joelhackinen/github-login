import { useEffect, useState } from 'react';
import { Link, useRouteLoaderData, useNavigate } from 'react-router-dom';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();
  const loaderData = useRouteLoaderData("root");
  console.log(loaderData);

  useEffect(() => {
    if (!loaderData) return navigate("/");

    fetch(loaderData?.repos_url)
      .then(res => res.json())
      .then(data => { setRepos(data) })
      .catch(error => {
        console.log(error);
        navigate("/")
      });
  }, [loaderData]);


  return (
    <div>
      <ul>
        {repos.map(r => (
          <li key={r.id}>
            <Link to={r.html_url}>
              {r.full_name} {r.language}
            </Link>
          </li>))}
      </ul>
    </div>
  );
};

export default Projects;