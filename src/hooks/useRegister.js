import apiInstance from "../Instance/api";

const useRegister = async (data) => {
  try {
    const response = await apiInstance.post(`/register`, data);

    console.log("register response...", response?.data);

    return response?.data;
  } catch (error) {
    console.log("error register code....", error);
  }
};


export default useRegister;