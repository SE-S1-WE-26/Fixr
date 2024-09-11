import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    // Add your form submission logic here
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            style={{ width: 80, height: 80, marginVertical: 24 }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Sign Up to Fixr
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            style={{ marginBottom: 20 }}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            style={{ marginBottom: 20 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            style={{ marginBottom: 20 }}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyle={{ marginTop: 20 }}
            isLoading={isSubmitting}
          />
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: '#737373' }}>
              Already have an account?
            </Text>
            <Link href="/sign-in" style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
