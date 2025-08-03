// services/githubService.js
const fetchUserData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Looks like we cant find the user");
  }
  const data = await response.json();
  return data;
};

export default fetchUserData;
