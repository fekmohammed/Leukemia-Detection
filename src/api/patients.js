export const getPatients = async () => {
    const res = await fetch('patients.json');
    if (!res.ok) throw new Error('Failed to fetch patients');
    return res.json();
};
