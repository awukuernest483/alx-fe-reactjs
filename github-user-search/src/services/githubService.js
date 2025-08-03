// services/githubService.js
import axios from 'axios';

const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Looks like we cant find the user");
  }
};

export default fetchUserData;
