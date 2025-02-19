import React, { useContext } from "react";
import { GitHubContext } from "../context/GitHubContext";
import "../styles/repoList.css";

interface RepoListProps {
  onSelectRepo: (repoName: string) => void;
}

const RepoList: React.FC<RepoListProps> = ({ onSelectRepo }) => {
  const context = useContext(GitHubContext);

  if (!context) return null;

  const { repos, page, nextPage, prevPage } = context;

  return (
    <div className="repo-list">
      <h2>Repositories</h2>
      <ul>
        {repos.length > 0 ? (
          repos.map((repo) => (
            <li key={repo.id} onClick={() => onSelectRepo(repo.name)} style={{ cursor: "pointer" }}>
              <strong>{repo.name}</strong> - {repo.description || "No description"}
            </li>
          ))
        ) : (
          <p>No repositories found.</p>
        )}
      </ul>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          ⬅ Previous
        </button>
        <span>Page {page}</span>
        <button onClick={nextPage}>Next ➡</button>
      </div>
    </div>
  );
};

export default RepoList;
