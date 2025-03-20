import axios from 'axios';

const API_URL = 'http://localhost:3000/insurances';
export async function fetchInsurances (params) {
    const fetchedInsurances = await axios.get(API_URL, { params });
    return fetchedInsurances.data;
}

export async function fetchPolicyTypes () {
    const fetchedPolicyTypes = await axios.get(API_URL+'/type');
    return fetchedPolicyTypes.data;
}