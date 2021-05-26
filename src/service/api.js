import axios from 'axios';

// const baseURL = "http://localhost:3030";
const baseURL = "https://human-resources-api1.herokuapp.com";

//Getting all employees
export const getEmployees = async (token) => {
  return await axios.get(baseURL+"/employees", {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }).catch(() => {
    console.log("Ha habido un error recuperando la informacion");
  });
};

//Adding an employee
export const saveEmployee = async (payload, token) => {
  return await axios.post(baseURL+"/employees", payload, {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }).catch(() => {
    console.log("Ha habido un error generando el registro");
  });
};

//Updating an employee
export const updateEmployee = async (payload, token) => {
  return await axios.patch(baseURL+"/employees", payload, {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }).catch(() => {
    console.log("Ha habido un error actualizando el registro");
  });
};

//Removing an employee
export const deleteEmployee = async (id, token) => {
  // debugger
  return await axios.delete(baseURL+`/employees/${id}`, {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }).catch((e) => {
    console.log("Ha habido un error eliminando el registro");
  })
};

//User section --> Register
export const saveUser = async (payload) => {
  return await axios.post(baseURL+"/users/signup", payload).catch(() => {
    console.log("Ha habido un error generando el usuario");
  });
};

//Login
export const login = async (payload) => {
  return await axios.post(baseURL+"/users/login", payload).catch(() => {
    console.log("Ha habido un error durante el inicio de sesión");
  });
};
