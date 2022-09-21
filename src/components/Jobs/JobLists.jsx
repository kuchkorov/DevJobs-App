import React, { useState } from "react";

import jobs from "../../data/data";
import { Link } from "react-router-dom";

const JobLists = () => {
  const [jobData, setJobData] = useState(jobs);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");

  const searchTermValue = searchTerm.toLowerCase();

  //   ======== lokatsiya orqali qidirish =====

  const locationSearchHandler = () => {
    const filteredData = jobs.filter((job) =>
      job.location.toLowerCase().includes(searchByLocation.toLowerCase())
    );

    setJobData(filteredData);
  };

  // ======== part-time, full-time, freelance bo'yicha qidirish ======
  const filterJobData = (e, type) => {
    const filterValue = e.target.value;

    // setJobData(
    //   jobData?.filter((item) => {
    //     if (type === "search") {
    //       return item?.contract?.includes(filterValue);
    //     } else {
    //       return item?.location?.includes(filterValue);
    //     }
    //   })
    // );
    if (filterValue === "full-time") {
      const filteredData = jobs.filter((job) => job.contract === "Full Time");
      setJobData(filteredData);
    } else if (filterValue === "part-time") {
      const filteredData = jobs.filter((job) => job.contract === "Part Time");
      setJobData(filteredData);
    } else if (filterValue === "freelance") {
      const filteredData = jobs.filter((job) => job.contract === "Freelance");
      setJobData(filteredData);
    } else if (filterValue === "contract") {
      const filteredData = jobs.filter((job) => job.contract === "Contract");
      setJobData(filteredData);
    } else {
      setJobData(jobs);
    }
  };

  return (
    <section className='job__list'>
      <div className='container'>
        <div className='job__list__wrapper'>
          <div className='search__panel'>
            <div className='search__panel-01'>
              <span>
                <i class='ri-search-line'></i>
              </span>
              <input
                type='text'
                placeholder='Search by title, companies'
                value={searchTerm}
                onChange={(e) => filterJobData(e, "search")}
              />
            </div>

            <div className='search__panel-02'>
              <span>
                <i class='ri-map-pin-line'></i>
              </span>
              <input
                type='text'
                placeholder='Search by location'
                value={searchByLocation}
                onChange={(e) => filterJobData(e, "location")}
              />
              <button className='btn' onClick={locationSearchHandler}>
                Search
              </button>
            </div>

            <div className='search__panel-03'>
              <select onChange={(e) => filterJobData(e, "search")}>
                <option>Filter job by</option>
                <option value='full-time'>Full Time</option>
                <option value='part-time'>Part Time</option>
                <option value='freelance'>Freelance</option>
                <option value='contract'>Contract</option>
              </select>
            </div>
          </div>

          <div className='jobs__wrapper'>
            {jobData
              ?.filter((job) => {
                if (searchTerm === "") return job;
                if (
                  job.position.toLowerCase().includes(searchTermValue) ||
                  job.company.toLowerCase().includes(searchTermValue)
                )
                  return job;
              })
              .map((item) => (
                <div className='job__item' key={item.id}>
                  <img src={item.logo} alt='' />

                  <div className='job__content'>
                    <h6>
                      {item.postedAt} - {item.contract}
                    </h6>
                    <h1>
                      <Link to={`/jobs/${item.position}`}>{item.position}</Link>
                    </h1>
                    <p>{item.company}</p>

                    <div className='location'>
                      <p>
                        Location: <span>{item.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobLists;
