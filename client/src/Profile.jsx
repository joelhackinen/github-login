import { Link, useLoaderData, useSubmit } from 'react-router-dom';
import { useMemo, useState } from 'react';

const PAGING = 5;

const Projects = () => {
  const { user, repos } = useLoaderData();
  const submit = useSubmit();
  const [page, setPage] = useState(1);

  const maxPage = useMemo(() => {
    return Math.ceil(repos.length / PAGING);
  }, [repos]);

  const setPaging = (incr) => {
    incr
      ? setPage(Math.min(page + 1, maxPage))
      : setPage(Math.max(page - 1, 1))
  };

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-row justify-between p-6'>
        <span className='text-left'>
          {'Logged in as '}
          <Link className='hover:text-sky-800' to={user.html_url}>
            {user.login}
          </Link>
        </span>
        <span className='text-right'>
          <button
            className='hover:text-sky-800'
            onClick={() => submit(null, { method: 'post', action: '/logout' })}
          >
            log out
          </button>
        </span>
      </div>
      <div className='flex flex-col gap-16'>
        <div className='flex flex-row self-center'>
          <button
            className={`${page === 1 ? 'invisible' : 'visible'}`}
            onClick={() => setPaging(false)}
          >
            {'<<'}
          </button>
          <span className='text-center mx-10'>page</span>
          <button
            className={`${page === maxPage ? 'invisible' : 'visible'}`}
            onClick={() => setPaging(true)}
          >
            {'>>'}
          </button>
        </div>
        <ul className='flex flex-col self-center gap-2'>
          {repos.slice((page - 1) * PAGING, page * PAGING).map(r => (
            <li key={r.id}>
              <Link to={r.html_url}>
                {r.full_name} {r.language}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;