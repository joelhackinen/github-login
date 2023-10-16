import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="font-mono text-sky-500 text-lg min-w-min">
      <Outlet />
    </div>
  );
};

export default App;
