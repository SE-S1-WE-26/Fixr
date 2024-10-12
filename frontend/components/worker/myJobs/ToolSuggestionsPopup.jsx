import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { icons } from "../../../constants";

const ToolSuggestionsPopup = ({ visible, tools, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when modal is opened
    if (visible) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // Set loading duration to 3 seconds

      // Clean up timer on unmount
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View className="flex flex-row items-center mb-4">
            <Text className="text-lg font-bold mr-2 ">Tools You May Need</Text>
            <Image source={icons.ai} style={{ width: 18, height: 18 }} />
          </View>
          <View className="p-4 bg-powder border-2 border-platinum rounded-lg mt-2 w-full h-[150px] flex justify-center items-center">
            {loading ? (
              <View className="flex flex-row justify-center items-center">
                <ActivityIndicator size="large" color="orange" />
                <Text className="ml-2 text-sm">AI is thinking...</Text>
              </View>
            ) : tools.length > 0 ? (
              <Text>{tools.join(", ")}</Text>
            ) : (
              <Text>No tools suggested yet.</Text>
            )}
          </View>
          <Text className="text-gray-500 text-xs text-center mt-4">
            Never Forget What You Need Again! Our AI tool suggests the tools you may need based on the job description.
          </Text>

          <TouchableOpacity className='bg-orange rounded-full p-2 mt-4' onPress={onClose}>
          <Image source={icons.close} style={{ width: 26, height: 26 }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  popup: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
};

export default ToolSuggestionsPopup;
