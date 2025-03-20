import React, { useState, useEffect } from 'react';
import { undoFilterQuery } from '../utils';

const FilterForm = ({ onApply, initialFilters, policyTypes }) => {
  const [filters, setFilters] = useState({
    name: '',
    policyType: '',
    premiumGte: '',
    premiumGt: '',
    premiumLte: '',
    premiumLt: '',
    coverageGte: '',
    coverageGt: '',
    coverageLte: '',
    coverageLt: '',
    order: ''
  });

  useEffect(() => {
    if (initialFilters) {
      const updatedFilters = undoFilterQuery(initialFilters);
      setFilters({
        name: updatedFilters.name || '',
        policyType: updatedFilters.policyType || '',
        premiumGte: updatedFilters.premiumGte || '',
        premiumGt: updatedFilters.premiumGt || '',
        premiumLte: updatedFilters.premiumLte || '',
        premiumLt: updatedFilters.premiumLt || '',
        coverageGte: updatedFilters.coverageGte || '',
        coverageGt: updatedFilters.coverageGt || '',
        coverageLte: updatedFilters.coverageLte || '',
        coverageLt: updatedFilters.coverageLt || '',
        order: updatedFilters.order || ''
      });
    }
  }, [initialFilters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value || '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct API filter query dynamically
    //{'filter[name][eq]': car}
    const filterQuery = {};
    if (filters.name) filterQuery['filter[name][eq]'] = filters.name;
    if (filters.policyType) filterQuery['filter[policyType][eq]'] = filters.policyType;
    if (filters.premiumGte) filterQuery['filter[premium][gte]'] = filters.premiumGte;
    if (filters.premiumGt) filterQuery['filter[premium][gt]'] = filters.premiumGt;
    if (filters.premiumLte) filterQuery['filter[premium][lte]'] = filters.premiumLte;
    if (filters.premiumLt) filterQuery['filter[premium][lt]'] = filters.premiumLt;
    if (filters.coverageGte) filterQuery['filter[coverage][gte]'] = filters.coverageGte;
    if (filters.coverageGt) filterQuery['filter[coverage][gt]'] = filters.coverageGt;
    if (filters.coverageLte) filterQuery['filter[coverage][lte]'] = filters.coverageLte;
    if (filters.coverageLt) filterQuery['filter[coverage][lt]'] = filters.coverageLt;
    if (filters.order) filterQuery['order'] = filters.order;

    onApply(filterQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          placeholder="Enter Name"
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Policy Type:</label>
        <select
          name="policyType"
          value={filters.policyType}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Policy Type</option>
          {policyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Premium:</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="premiumGte"
            value={filters.premiumGte}
            placeholder="Min (>=)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            name="premiumGt"
            value={filters.premiumGt}
            placeholder="Min (>)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            name="premiumLte"
            value={filters.premiumLte}
            placeholder="Max (<=)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            name="premiumLt"
            value={filters.premiumLt}
            placeholder="Max (<)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Coverage:</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="coverageGte"
            value={filters.coverageGte}
            placeholder="Min (>=)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            name="coverageGt"
            value={filters.coverageGt}
            placeholder="Min (>)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            name="coverageLte"
            value={filters.coverageLte}
            placeholder="Max (<=)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            name="coverageLt"
            value={filters.coverageLt}
            placeholder="Max (<)"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Sort By:</label>
        <select
          name="order"
          value={filters.order}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Default</option>
          <option value="name">Name (A-Z)</option>
          <option value="-name">Name (Z-A)</option>
          <option value="premium">Premium (Low to High)</option>
          <option value="-premium">Premium (High to Low)</option>
          <option value="coverage">Coverage (Low to High)</option>
          <option value="-coverage">Coverage (High to Low)</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;