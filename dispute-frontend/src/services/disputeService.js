import api from "./api";

export const getDisputes = () => {
  return api.get("/disputes");
};

export const getDisputeById = (id) => {
  return api.get(`/disputes/${id}`);
};

export const createDispute = (data) => {
  return api.post("/disputes", data);
};

export const getTeams = () => {
  return api.get("/teams");
};

export const getUsersByTeam = (team) => {
  return api.get(`/users/team/${team}`);
};