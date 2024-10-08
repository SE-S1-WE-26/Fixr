import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { React, useState } from "react";

import { icons } from "../../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={` ${otherStyles}`}>
      <Text className="text-base font-medium">{title}</Text>
      <View className="border-2 border-gray-500 w-full h-12 px-4 bg-black-200 rounded-2xl focus:border-orange items-center flex-row">
        <TextInput
          className="flex-1 font-semibold text-base items-center justify-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
