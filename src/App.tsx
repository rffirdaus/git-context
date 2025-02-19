// src/App.tsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetail";
import { GitHubProvider } from "./context/GitHubContext";

const App: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  return (
    <GitHubProvider>
      <div className="app-container">
        <SearchBar onSelectUser={(username) => console.log(username)} />
       <div className="app-flex">
        <RepoList onSelectRepo={setSelectedRepo} />
        {selectedRepo && <RepoDetails repoName={selectedRepo} />}
       </div>
      </div>
    </GitHubProvider>
  );
};

export default App;