import { View, Text, ScrollView, Image,TouchableOpacity , ActivityIndicator} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/common/CustomButton";
import { Link } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/common/FormField";
import WorkerSignUp from "../../components/common/auth/WorkerSignUp";
import ClientSignUp from "../../components/common/auth/ClientSignUp";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWorker,setIsWorker] = useState(false);

  const submit = () => {
    // Add your form submission logic here
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}>
      <TouchableOpacity onPress={() => setIsWorker(!isWorker)} className={`${isWorker ? 'bg-black-900':'bg-orange'} rounded-lg py-4 px-6 mt-4`}>
            <Text className='text-white font-bold'>
              {isWorker ? "Sign Up as a Client" : "Sign Up as a Worker"}
            </Text>
          </TouchableOpacity>
        {isWorker ? (<ClientSignUp />) : (<WorkerSignUp />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
