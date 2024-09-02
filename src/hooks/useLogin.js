import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "../Instance/api";

const useLogin = async (data) => {
  try {
    console.log("data passed", data);

    const response = await apiInstance.post(`/login`, data);

    console.log("register response...", response?.data);

    const token = response?.data?.success?.token;
    if (token) {
      await AsyncStorage.setItem('userToken', token);
      
      console.log("Token saved to AsyncStorage");
      
      return response?.data;
    }
  } catch (error) {
    console.log("error register code....", error.response ? error.response.data : error.message);

    throw error;
  }
};

export default useLogin;
