import React, { useEffect, useState } from "react";
import InsurancesTable from "../components/InsurancesTable";
import FilterForm from "../components/FilterForm";
import { fetchInsurances, fetchPolicyTypes } from "../apiService";

const InsuranceList = () => {
  const [insurances, setInsurances] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [policyTypes, setPolicyTypes] = useState([]);

  useEffect(() => {
    async function getPolicyTypes() {
      setPolicyTypes(await fetchPolicyTypes());
    }
    getPolicyTypes();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  const fetchData = async () => {
    try {
      const params = { page, limit: 10, ...filters };
      const data = await fetchInsurances(params);
      setInsurances(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Type", accessor: "type" },
    { Header: "Premium", accessor: "premium" },
    { Header: "Coverage", accessor: "coverage" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {showFilter ? 'X' : 'Filters'}
        </button>
      </div>
      {showFilter && (
        <div className="mb-4">
          <FilterForm onApply={setFilters} initialFilters={filters} policyTypes={policyTypes} />
        </div>
      )}
      <div className="mb-4">
        <InsurancesTable data={insurances} columns={columns} />
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InsuranceList;
