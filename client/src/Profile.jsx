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
      <div className='flex flex-row justify-between p-6'>
        <span className='text-left'>
          {'Logged in as '}
          <Link className='hover:text-sky-800 font-semibold' to={user.html_url}>
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
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={repos}>
          <ProjectList />
        </Await>
      </Suspense>
    </div>
  );
};

export default Profile;