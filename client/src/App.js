import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    fetch("http://localhost:8080/ping")
      .then(r => console.log("ping success:", r.ok))
  }, []);

  return (
    <div>Moro!</div>
  )
};

export default App;