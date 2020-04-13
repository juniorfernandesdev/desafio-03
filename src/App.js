import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    });
  }, [setRepo]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Instagram ${Date.now()}`,
	    "url": "http://github.com/facebook",
	    "techs": ["React", "React Native"]
    });

    const repositorie = response.data;

    setRepo([...repo, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepo(repo.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(repo => (
          <li key={repo.id}>
            <p>{repo.title}</p> - <span><button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button></span> 
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
