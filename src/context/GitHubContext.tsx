import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchUserRepos, fetchReadme } from "../service/githubApi";

interface GitHubContextType {
  repos: any[];
  readme: string | null;
  page: number;
  perPage: number;
  selectedUser: string;
  nextPage: () => void;
  prevPage: () => void;
  searchUser: (username: string) => Promise<void>;
  fetchRepoReadme: (owner: string, repo: string) => Promise<void>;
}

export const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export const GitHubProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [readme, setReadme] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 5; // Jumlah repositori per halaman
  const [selectedUser, setSelectedUser] = useState("vercel"); // Default user

  // Fungsi untuk mencari repo berdasarkan username
  const searchUser = async (username: string) => {
    setSelectedUser(username);
    setPage(1); // Reset ke halaman pertama saat username berubah
    try {
      const data = await fetchUserRepos(username, 1, perPage);
      setRepos(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setRepos([]); // Kosongkan daftar repos jika error
    }
  };

  // Fungsi untuk mengambil README dari repo tertentu
  const fetchRepoReadme = async (owner: string, repo: string) => {
    try {
      const content = await fetchReadme(owner, repo);
      setReadme(content);
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadme(null);
    }
  };

  // Fungsi untuk halaman selanjutnya
  const nextPage = async () => {
    const newPage = page + 1;
    try {
      const data = await fetchUserRepos(selectedUser, newPage, perPage);
      if (data.length > 0) {
        setRepos(data);
        setPage(newPage);
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
    }
  };

  // Fungsi untuk halaman sebelumnya
  const prevPage = async () => {
    if (page > 1) {
      const newPage = page - 1;
      try {
        const data = await fetchUserRepos(selectedUser, newPage, perPage);
        setRepos(data);
        setPage(newPage);
      } catch (error) {
        console.error("Error fetching previous page:", error);
      }
    }
  };

  // Ambil repositori default saat pertama kali aplikasi dibuka
  useEffect(() => {
    searchUser(selectedUser);
  }, []);

  return (
    <GitHubContext.Provider value={{ repos, readme, page, perPage, selectedUser, nextPage, prevPage, searchUser, fetchRepoReadme }}>
      {children}
    </GitHubContext.Provider>
  );
};
