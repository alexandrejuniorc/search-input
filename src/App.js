import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [search, setSearch] = useState('');

  console.log('Renderizou');

  useEffect(() => {
    axios
      .get('https://api.github.com/users/alexandrejuniorc/repos')
      .then((res) => setRepositories(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFilteredRepos(repositories.filter((repo) => repo.name.includes(search)));
  }, [search]);

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <ul>
          {filteredRepos.map((repo) => {
            return <li key={repo.name}>{repo.name}</li>;
          })}
        </ul>
      ) : (
        <ul>
          {repositories.map((repo) => {
            return <li key={repo.name}>{repo.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
