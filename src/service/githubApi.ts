const GITHUB_API_URL = "https://api.github.com";
const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN; // Pastikan ada di .env

const headers = {
  Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

// Fetch daftar repositori
export const fetchUserRepos = async (username: string, page: number = 1, perPage: number = 5) => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?per_page=${perPage}&page=${page}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

// Fetch README dari repositori
export const fetchReadme = async (owner: string, repo: string) => {
  const url = `${GITHUB_API_URL}/repos/${owner}/${repo}/readme`;

  try {
    const response = await fetch(url, { headers });

    if (response.status === 404) {
      return "README not found.";
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch README (${response.status})`);
    }

    const data = await response.json();
    return atob(data.content); // Decode base64
  } catch (error) {
    console.error("Error fetching README:", error);
    return "Failed to load README.";
  }
};
