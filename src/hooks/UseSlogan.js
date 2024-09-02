import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiInstance from "../Instance/api";

const UseSlogan = (postId) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSlogans = async () => {
      try {
        console.log("Fetching token...");
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
          throw new Error("No token found");
        }

        console.log("Token retrieved:", token);

        const response = await apiInstance.get(`/get_slogans_byPost?post_id=${postId}`

        );

        console.log("API response:", response?.data);

        // Access the data array in the response
        setPosts(response?.data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error.response ? error.response.data : error.message);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchSlogans();
  }, [postId]);

  return { posts, isLoading, error };
};

export default UseSlogan;
