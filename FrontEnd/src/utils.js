export const undoFilterQuery = (filterQuery) => {
    const initialFilterQuery = {};
    const undoObject = {
        'filter[name][eq]': 'name',
        'filter[premium][gte]':'premiumGte',
        'filter[premium][gt]':'premiumGt',
        'filter[premium][lte]':'premiumLte',
        'filter[premium][lt]':'premiumLt',
        'filter[coverage][gte]':'coverageGte',
        'filter[coverage][gt]':'coverageGt',
        'filter[coverage][lte]':'coverageLte',
        'filter[coverage][lt]':'coverageLt',
        'filter[policyType][eq]': 'policyType',
        'order': 'order'
    }
    for(let [filter, value] of Object.entries(filterQuery)) {
        initialFilterQuery[undoObject[filter]] = value
    }
    return initialFilterQuery;
}