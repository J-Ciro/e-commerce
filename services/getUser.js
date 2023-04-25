const URL_API = "http://localhost:3000/usuarios";

const getUser = async (userName, password) => {
  try {
    const url = `${URL_API}?user=${userName}&password=${password}`;
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getUser;