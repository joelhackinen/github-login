import { Link, useLoaderData } from 'react-router-dom';

const Projects = () => {
  const repos = useLoaderData();

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