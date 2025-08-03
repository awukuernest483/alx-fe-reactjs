// services/githubService.js
const fetchUserData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("User not found");
  }
  const data = await response.json();
  return data;
};

export default fetchUserData;
