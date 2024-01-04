import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return getResponse(request);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return getResponse(request);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.status);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return getResponse(request);
};

const getResponse = (request) => {
  return request.then((response) => response.data);
};

export default { getAll, create, update, deletePerson };
