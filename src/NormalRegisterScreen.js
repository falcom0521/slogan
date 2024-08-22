import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import {
  useFonts,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import useRegister from "./hooks/useRegister";

const NormalRegisterScreen = ({ navigation }) => {
  const [dob, setDob] = useState(null); // Initialize dob as null
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Validation schema including gender and dob
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    phonenumber: Yup.string().required("Phone number is required"),
    dob: Yup.date()
      .nullable() // Allow null initially
      .required("Date of Birth is required")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      ),
    gender: Yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phonenumber: "",
      dob: null,
      gender: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      values.gender = selectedGender;
      values.dob = dob;

      try {
        const data = {
          email: values.email,
          password: values.password,
          user_type: "1",
          first_name: values.name,
          last_name: values.name,
          creator_category_id: "1",
          image: "",
          gender: selectedGender === "M" ? 1 : 2,
        };

        const res = await useRegister(data);
        console.log("Register response:", res); // Log the entire response object for debugging

        if (res?.["status code"] === 200) {
          console.log("Navigating to OTP screen with email:", values.email);

          navigation.navigate("OtpScreen",{ email: values.email }); // Navigate to OTP screen
        } else {
          Alert.alert("Registration failed: ", res?.message);
        }

      } catch (error) {
        console.log("error code...", error);
        Alert.alert("Error", "The email is already registsered , please Sign up !!");

      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
      formik.setFieldValue("dob", selectedDate);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Group 32.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Register</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          placeholder="Name"
        />
        {formik.touched.name && formik.errors.name ? (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          value={formik.values.email}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("phonenumber")}
          onBlur={formik.handleBlur("phonenumber")}
          value={formik.values.phonenumber}
          placeholder="Phone number"
          keyboardType="numeric"
        />
        {formik.touched.phonenumber && formik.errors.phonenumber ? (
          <Text style={styles.errorText}>{formik.errors.phonenumber}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {dob ? dob.toDateString() : "Date of Birth"}
          </Text>
        </TouchableOpacity>
        {formik.touched.dob && formik.errors.dob ? (
          <Text style={styles.errorText}>{formik.errors.dob}</Text>
        ) : null}
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View>
        <View style={styles.genderContainer}>
          <View style={styles.gendername}>
            <Text style={styles.gendertext}>Gender</Text>
          </View>
          <View style={styles.gendersel}>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === "M" && styles.selectedGenderButton]}
              onPress={() => {
                setSelectedGender("M");
                formik.setFieldValue("gender", "M"); // Update formik's gender value
              }}
            >
              <Text style={styles.gendertext}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === "F" && styles.selectedGenderButton,
              ]}
              onPress={() => {
                setSelectedGender("F");
                formik.setFieldValue("gender", "F"); // Update formik's gender value
              }}
            >
              <Text style={styles.gendertext}>F</Text>
            </TouchableOpacity>
          </View>
        </View>
        {formik.touched.gender && formik.errors.gender ? (
          <Text style={styles.errorText}>{formik.errors.gender}</Text>
        ) : null}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#B12341" />
        ) : (
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={formik.handleSubmit}
            underlayColor="#F0F0F0"
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
        )}
      </View>
      <TouchableOpacity
        style={styles.registercontainer}
        onPress={() => navigation.navigate("NormalLogin")}
      >
        <Text style={styles.test}>Don’t have an account? </Text>
        <Text style={styles.register}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: "white",
  },
  imageContainer: {
    marginTop: moderateScale(58),
    alignItems: "left",
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  textContainer: {
    marginBottom: moderateScale(10),
    alignItems: "left",
  },
  text: {
    fontSize: 25,
    fontFamily: "Poppins_600SemiBold",
  },
  inputContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#F1F1F1",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    width: "100%",
  },
  dateInput: {
    height: 50,
    backgroundColor: "#F1F1F1",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#666",
    alignItems: "flex-start",
  },
  genderContainer: {
    marginTop: moderateScale(10), // Reduced space to eliminate extra margin
    textAlign: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between", // To align gender name and buttons properly
    alignItems: "center",
  },
  gendername: {
    height: 50,
    backgroundColor: "#F1F1F1",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: moderateScale(10),
    width: "60%",
    justifyContent: "center", // Center text vertically
    alignItems: "left", // Center text horizontally
    marginTop: moderateScale(10),
  },
  gendertext: {
    fontSize: 16,
  },
  gendersel: {
    flexDirection: "row",
    marginTop: 0, // Removed extra margin
  },
  genderButton: {
    backgroundColor: "#F1F1F1",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    height: moderateScale(50),
    width: moderateScale(50),
    justifyContent: "center", // Center text horizontally
    alignItems: "center", // Center text vertically
  },
  buttonContainer: {
    marginTop: moderateScale(30),
    alignItems: "center",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: moderateScale(307),
    height: moderateScale(68),
    backgroundColor: "#B12341",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  registercontainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  test: {
    fontFamily: "Poppins_300Light",
  },
  register: {
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
    color: "#B12341",
  },
  errorText: {
    color: "red",
  },
  selectedGenderButton: {
    backgroundColor: "#B12341", // Change this color to whatever you prefer for selected state
  },
});

export default NormalRegisterScreen;
