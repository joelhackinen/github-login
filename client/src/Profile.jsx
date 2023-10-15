import {
  Link,
  useLoaderData,
  useSubmit,
  Await
} from 'react-router-dom';
import { Suspense } from 'react';
import ProjectList from './ProjectList';


const Profile = () => {
  const { user, repos } = useLoaderData();
  const submit = useSubmit();

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-row p-6 justify-between items-center'>
        <div className='flex flex-row order-first items-center gap-x-3'>
          <div className='flex-1 grow-0'>
            {'logged in as '}
            <Link className='hover:text-sky-800 font-semibold' to={user.html_url}>
              {user.login}
            </Link>
          </div>
          <img src={user.avatar_url} className='max-h-12 rounded-full border-2 border-sky-500'/>
        </div>
        <div className='order-last'>
          <button
            className='hover:text-sky-800'
            onClick={() => submit(null, { method: 'post', action: '/logout' })}
          >
            log out
          </button>
        </div>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={repos}>
          <ProjectList />
        </Await>
      </Suspense>
    </div>
  );
};

export default Profile;