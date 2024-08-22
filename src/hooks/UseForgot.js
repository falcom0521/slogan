import apiInstance from "../Instance/api";

const useForgot = async (data) => {
  try {
    console.log("data passed", data);

    const response = await apiInstance.post(`/forgot-password`, data);

    console.log("forgot response...", response?.data);

    return response?.data;
  } catch (error) {
    console.log("error register code....", error.response ? error.response.data : error.message);

    throw error;
  }
};

export default useForgot;
