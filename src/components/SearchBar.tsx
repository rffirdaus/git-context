import React, { useState, useContext } from "react";
import { GitHubContext } from "../context/GitHubContext";
import "../styles/searcBar.css"; // Import CSS

interface SearchBarProps {
  onSelectUser: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectUser }) => {
  const [username, setUsername] = useState("");
  const { searchUser } = useContext(GitHubContext)!;

  const handleSearch = () => {
    if (username.trim() === "") return;
    searchUser(username);
    onSelectUser(username);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
