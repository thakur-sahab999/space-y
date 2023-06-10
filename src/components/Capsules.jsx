import React, { useState, useEffect } from "react";
import Search from "./Search";

const Capsules = ({ data }) => {
  function paginateArray(array, itemsPerPage) {
    const pageCount = Math.ceil(array.length / itemsPerPage);

    return Array.from({ length: pageCount }, (_, pageIndex) => {
      const startIndex = pageIndex * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return array.slice(startIndex, endIndex);
    });
  }
  const [arrayOfCapsules, setArrayOfCapsules] = useState(data);
  const [pages, setPages] = useState(paginateArray(arrayOfCapsules, 10));
  const [page, setpage] = useState(pages[0]);
  const [toggleState, setToggleState] = useState(1);
  useEffect(() => {
    setPages(paginateArray(arrayOfCapsules, 10));
  }, [arrayOfCapsules]);
  useEffect(() => {
    setpage(pages[0]);
  }, [pages]);

  return (
    <section className=" flex flex-col items-center w-full px-8 ">
      {data && (
        <Search
          data={data}
          arrayOfCapsules={arrayOfCapsules}
          setArrayOfCapsules={setArrayOfCapsules}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 w-full place-items-center gap-y-8">
        {page?.map((capsule, id) => (
          <SingleCapsule capsule={capsule} key={id} />
        ))}
      </div>
      <ul className="list-none w-full flex gap-4 justify-center items-center my-8">
        {pages.map((page, id) => (
          <li
            className={`flex items-center ${
              toggleState === id + 1
                ? " text-white bg-blue-600"
                : " bg-white text-blue-600 "
            } justify-center w-[30px] h-[30px] cursor-pointer text-center rounded-md `}
            onClick={() => {
              setpage(pages[id]);
              setToggleState(id + 1);
            }}
            key={id}
          >
            {id + 1}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Capsules;

//to render a capsule card
const SingleCapsule = ({ capsule }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && <Modal setModal={setModal} capsule={capsule} />}

      <div
        className="bg-white border-t-2 rounded-lg w-[90vw] border md:w-[25vw] cursor-pointer text-gray-800 shadow-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={() => setModal(true)}
      >
        <h2 className="text-2xl font-bold mb-4 text-black">
          {" "}
          {capsule?.capsule_serial ? capsule?.capsule_serial : ""}{" "}
          {capsule?.capsule_id ? capsule?.capsule_id : ""}
        </h2>
        <p>
          <span className="font-semibold">Capsule Serial:</span>{" "}
          {capsule?.capsule_serial ? capsule?.capsule_serial : ""}
        </p>
        <p>
          <span className="font-semibold">Capsule ID:</span>{" "}
          {capsule?.capsule_id ? capsule?.capsule_id : ""}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {capsule?.status ? capsule?.status : ""}
        </p>

        <p>
          <span className="font-semibold">Missions:</span>{" "}
          {capsule?.missions[0]?.name ? capsule?.missions[0]?.name : ""} (Flight{" "}
          {capsule?.missions[0]?.flight ? capsule?.missions[0]?.flight : ""} )
        </p>

        <p>
          <span className="font-semibold">Type:</span>{" "}
          {capsule?.type ? capsule?.type : ""}
        </p>
      </div>
    </>
  );
};

// pop up for detailed information
const Modal = ({ setModal, capsule }) => {
  return (
    <div className="fixed overflow-hidden cursor-pointer flex items-center justify-center top-0 z-50 w-full h-full left-0 transition-all ease-in-out delay-75">
      <div
        className="absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm"
        onClick={() => setModal(false)}
      ></div>
      <div className="bg-white w-[90vw] md:w-1/2 h-auto z-40 shadow-xl border rounded-lg">
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 flex flex-col justify-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {capsule?.capsule_serial ? capsule?.capsule_serial : ""}{" "}
            {capsule?.capsule_id ? capsule?.capsule_id : ""}
          </h2>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Capsule Serial:</span>{" "}
            {capsule?.capsule_serial ? capsule?.capsule_serial : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Capsule ID:</span>{" "}
            {capsule?.capsule_id ? capsule?.capsule_id : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Status:</span>{" "}
            {capsule?.status ? capsule?.status : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Original Launch:</span>{" "}
            {capsule?.original_launch ? capsule?.original : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Missions:</span>{" "}
            {capsule?.missions[0]?.name ? capsule?.missions[0]?.name : ""}{" "}
            (Flight{" "}
            {capsule?.missions[0]?.flight ? capsule?.missions[0]?.flight : ""})
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Landings:</span>{" "}
            {capsule?.landings ? capsule?.landings : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Type:</span>{" "}
            {capsule?.type ? capsule?.type : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Details:</span>{" "}
            {capsule?.details ? capsule?.details : ""}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Reuse Count:</span>{" "}
            {capsule?.reuse_count ? capsule?.reuse_count : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
