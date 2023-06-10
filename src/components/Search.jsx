import { useState } from "react";

const Search = ({ setArrayOfCapsules, data }) => {
  const [searchFilters, setSearchFilters] = useState({
    status: "",
    originalLaunch: "",
    type: "",
  });

  const handleFilterChange = (e) => {
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the search based on the filters
    // Update the state or perform any other necessary actions
    setArrayOfCapsules(filteredData);
  };
  // Apply the search filters to the  data
  const filteredData = data.filter((item) => {
    return (
      item?.status
        ?.toLowerCase()
        .includes(searchFilters.status.toLowerCase()) &&
      item?.original_launch_unix
        ?.toString()
        .toLowerCase()
        .includes(searchFilters.originalLaunch.toLowerCase()) &&
      item?.type?.toLowerCase().includes(searchFilters.type.toLowerCase())
    );
  });

  return (
    <div className="mb-6 z-40  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
        <div>
          <label htmlFor="status" className="text-lg font-semibold">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            placeholder="ex: active"
            value={searchFilters.status}
            onChange={handleFilterChange}
            className="border outline-none border-gray-300 px-4 py-2 w-full rounded"
          />
        </div>
        <div>
          <label htmlFor="originalLaunch" className="text-lg font-semibold">Original Launch:</label>
          <input
            type="text"
            id="originalLaunch"
            name="originalLaunch"
            placeholder="ex: 1362165000"
            value={searchFilters.originalLaunch}
            onChange={handleFilterChange}
            className="border border-gray-300 px-4 py-2 w-full rounded  outline-none"
          />
        </div>
        <div>
          <label htmlFor="type" className="text-lg font-semibold">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="ex: Dragon 2.0"
            value={searchFilters.type}
            onChange={handleFilterChange}
            className="border border-gray-300 px-4 py-2 w-full rounded "
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
      <button
        onClick={() => setArrayOfCapsules(data)}
        className="mt-4 bg-blue-500 hover:bg-blue-600 ml-4 text-white px-4 py-2 rounded"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Search;
