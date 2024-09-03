import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiInstance from "../Instance/api";

const useEdit = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchslogan = async () => {
      try {
        console.log("Fetching token...");
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
          throw new Error("No token found");
        }

        console.log("Token retrieved:", token);

        const response = await apiInstance.get('/get_userProfile', {
          

        });

        // console.log("API response:", response.data);
        

        setPosts(response.data.data.posts);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error.response ? error.response.data : error.message);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchslogan();
  }, []);

  return { posts, isLoading, error };
};

export default useEdit;
