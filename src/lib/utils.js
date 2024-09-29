import crypto from 'crypto';

const generateUUID = () => {
  return crypto.randomUUID();
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return distance;
};

const paginateResults = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page > totalPages ? totalPages : page;
  const offset = (currentPage - 1) * limit;

  return {
    currentPage,
    totalPages,
    limit,
    totalItems,
    offset
  };
};

export { generateUUID, formatDate, calculateDistance, paginateResults };