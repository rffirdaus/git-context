import React, { useContext, useEffect } from "react";
import { GitHubContext } from "../context/GitHubContext";
import "../styles/repoDetail.css";

interface RepoDetailProps {
  repoName: string;
}

const RepoDetail: React.FC<RepoDetailProps> = ({ repoName }) => {
  const context = useContext(GitHubContext);

  if (!context) return null;

  const { readme, fetchRepoReadme } = context;

  useEffect(() => {
    fetchRepoReadme("vercel", repoName); // Gantilah "vercel" dengan username dinamis jika ada
  }, [repoName, fetchRepoReadme]);

  return (
    <div className="repo-detail">
      <h2>Repository: {repoName}</h2>
      <div className="readme-content">
        {readme ? <pre>{readme}</pre> : <p>Loading README...</p>}
      </div>
    </div>
  );
};

export default RepoDetail;
