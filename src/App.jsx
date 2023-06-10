import React, { useState, useEffect } from "react";
// import LandingPage from './components/LandingPage';
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Capsules from "./components/Capsules";

const App = () => {
  const [capsulesData, setCapsulesData] = useState(null);
  useEffect(() => {
    async function getRockets() {
      try {
        const res = await fetch(`https://api.spacexdata.com/v3/capsules`);
        setCapsulesData(await res.json());
      } catch (err) {
        setCapsulesData(null);
        console.log(err);
      }
    }

    getRockets();
  }, []);

  return (
    <main className="flex flex-col">
      <Navbar />
      <Banner />
      {capsulesData && <Capsules data={capsulesData} />}
    </main>
  );
};

export default App;
