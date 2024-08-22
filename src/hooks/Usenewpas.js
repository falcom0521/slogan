import apiInstance from "../Instance/api";

const Usenewpas = async (data) => {
  try {
    console.log("data passed", data);

    const response = await apiInstance.post(`/forgotpwd-password-update`, data);

    console.log("register response...", response?.data);

    return response?.data;
  } catch (error) {
    console.log("error register code....", error.response ? error.response.data : error.message);

    throw error;
  }
};

export default Usenewpas;
