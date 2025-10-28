


// import React,{  useEffect,useState} from "react";
// import "./dashboard.css"; // Assuming you have a CSS file for styling
// import Navbar from "../Navbar"; // Importing the Navbar component


// const Dashboard = () => {

//     const [repositories, setRepositories] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         const userId = localStorage.getItem("userId");
//         const fetchRepositories = async () => {
//             try{
//             const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
//             const data = await response.json();
//             setRepositories(data.repositories);
//             } catch (error) {
//                 console.error("Error fetching repositories:", error);
//             }
//         }
//          const fetchSuggestedRepositories = async () => {
//             try{
//             const response = await fetch("http://localhost:3000/repo/all");
//             const data = await response.json();
//             setSuggestedRepositories(data);
//              console.log(suggestedRepositories);
//             } catch (error) {
//                 console.error("Error fetching repositories:", error);
//             }
//         }

         
//         fetchRepositories();
//         fetchSuggestedRepositories();
//     }, []);

//     useEffect(() => {
//         if(searchQuery==""){
//             setSearchResults(repositories   );
//         }else{
//             const filteredRepo= repositories.filter(repo =>
//                 repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
//                  setSearchResults(filteredRepo);
//         }
       
//     },[searchQuery,repositories]);

//     return (
//         <>
//         <Navbar />
//          <section id="dashboard">
//         <aside>
//           <h3>Suggested Repositories</h3>
//           {suggestedRepositories.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//         </aside>
//         <main>
//           <h2>Your Repositories</h2>
//           <div id="search">
//             <input
//               type="text"
//               value={searchQuery}
//               placeholder="Search..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           {searchResults.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//         </main>
//         <aside>
//           <h3>Upcoming Events</h3>
//           <ul>
//             <li>
//               <p>Tech Conference - Dec 15</p>
//             </li>
//             <li>
//               <p>Developer Meetup - Dec 25</p>
//             </li>
//             <li>
//               <p>React Summit - Jan 5</p>
//             </li>
//           </ul>
//         </aside>
//       </section>
    
//   </>
        
//     );
// }
// export default Dashboard;
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

    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRepoRes, allRepoRes] = await Promise.all([
          fetch(`http://51.21.194.205:3000/repo/user/${userId}`),
          fetch("http://51.21.194.205:3000/repo/all"),
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
