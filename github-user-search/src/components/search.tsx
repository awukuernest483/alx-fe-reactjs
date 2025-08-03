import React, { useState } from "react";
import fetchUserData from "../services/githubService";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const username = e.target.value.trim();

    // Clear results if input is empty
    if (!username) {
      setUsers([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = await fetchUserData(username);
      setUsers([userData]);
    } catch (err) {
      console.error("Error fetching user:", err.message);
      setUsers([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a GitHub user..."
        onChange={handleSearch}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      <ul id="search-results">
        {loading && <li>Loading...</li>}
        {error && <li style={{ color: "red" }}>{error}</li>}
        {!loading &&
          !error &&
          users.length > 0 &&
          users.map((user) => (
            <li key={user.id}>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={32}
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
