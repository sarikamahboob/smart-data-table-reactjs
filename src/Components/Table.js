import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TableData from "./TableData";
import "./Table.css";

const Table = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilter(data);
      });
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.common.toLowerCase().match(search.toLowerCase());
    });
    setFilter(result);
  }, [search]);

  const columns = [
    {
      name: "Country Flag",
      selector: (row) => (
        <img src={row?.flags?.png} alt="" className="w-[50%] h-[50%]" />
      ),
    },
    {
      name: "Country Name",
      selector: (row) => row?.name?.common,
      sortable: true,
    },
    {
      name: "Country Capital",
      selector: (row) => row?.capital,
      sortable: true,
    },

    {
      name: "Region",
      selector: (row) => row?.region,
    },
    {
      name: "Country Official Name",
      selector: (row) => row?.name?.official,
    },
  ];
  return (
    <div>
      <div>
        <p className="text-center my-24 font-bold text-4xl text-orange-500 font-saira">
          Table of Countries
        </p>
      </div>
      <div>
        <DataTable
          data={filter}
          columns={columns}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search by Country Name"
              className="w-25 p-4 border rounded-lg border-orange-500 mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="center"
        ></DataTable>
      </div>
    </div>
  );
};

export default Table;
