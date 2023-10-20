import { useAsyncValue, Link } from "react-router-dom";
import { useState, useMemo } from "react";

const PAGING = 6;

const ProjectList = () => {
  const [page, setPage] = useState(1);
  const repos = useAsyncValue();

  const maxPage = useMemo(() => Math.ceil(repos.length / PAGING), [repos]);

  const setPaging = (incr) => {
    incr
      ? setPage(Math.min(page + 1, maxPage))
      : setPage(Math.max(page - 1, 1));
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row gap-x-16 self-center">
        <button
          className={`hover:font-bold hover:underline ${
            page === 1 ? "invisible" : "visible"
          }`}
          onClick={() => setPaging(false)}
        >
          {"<<"}
        </button>
        <span>{page}</span>
        <button
          className={`hover:font-bold hover:underline ${
            page === maxPage ? "invisible" : "visible"
          }`}
          onClick={() => setPaging(true)}
        >
          {">>"}
        </button>
      </div>
      <ul className="flex flex-col gap-2 self-center">
        {repos.slice((page - 1) * PAGING, page * PAGING).map((r) => (
          <li key={r.id}>
            <Link className="hover:underline" to={r.html_url}>
              {r.full_name} {r.language}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
