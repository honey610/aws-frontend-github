
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found in localStorage");
      return;
    }

    // http://13.50.196.250/repo/user/${userId}
    // http://13.50.196.250/repo/all
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRepoRes, allRepoRes] = await Promise.all([
          fetch(`https://9a08fhn33e.execute-api.eu-north-1.amazonaws.com/prod/repo/user/${userId}`),
          fetch("https://9a08fhn33e.execute-api.eu-north-1.amazonaws.com/prod/repo/all"),
        ]);

        const userData = await userRepoRes.json();
        const allData = await allRepoRes.json();

        setRepositories(userData.repositories || []);
        setSuggestedRepositories(allData || []);
        setSearchResults(userData.repositories || []);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.length > 0 ? (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          ) : (
            <p>No suggestions available.</p>
          )}
        </aside>

        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading your repositories...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          ) : (
            <p>No repositories found.</p>
          )}
        </main>

        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
