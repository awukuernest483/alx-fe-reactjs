import React, { useEffect, useState } from "react";
import fetchUserData from "../services/githubService";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData((username) => `https://api.github.com/users/${username}`)
      .then((userData) => {
        setUsers(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a GitHub user..."
        className="search-input"
        aria-label="Search GitHub users"
        aria-describedby="search-help"
        autoComplete="off"
        autoFocus
        spellCheck="false"
        role="searchbox"
        id="github-user-search"
        name="github-user-search"
        data-testid="github-user-search"
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        onChange={(e) => {
          fetchUserData(e.target.value ?? "a");
        }}
      />

      <ul id="search-results">
        {loading ? (
          <li>Loading...</li>
        ) : users.length > 0 ? (
          users.map((user) => (
            <li key={user} className="search-result-item">
              {user}
            </li>
          ))
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
