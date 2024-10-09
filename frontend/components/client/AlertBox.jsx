import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import icons from '../../constants/icons';
const AlertBox = ({ visible, title, onClose, message, image }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-40">
                <View className="bg-white rounded-lg px-6 py-10 w-11/12 max-w-md shadow-lg items-center">
                    {/* Error Icon */}
                    <Image
                        source={icons[image]} // Replace with your image
                        style={{ width: 100, height: 100, tintColor: '#C21807' }}
                    />

                    {/* Error Title */}
                    <Text className="text-2xl font-bold text-red-600 mt-4">{title}</Text>

                    {/* Message */}
                    <Text className="text-center text-lg mt-2 mb-4 text-gray-600">{message}</Text>

                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="bg-teal-500 px-6 py-2 rounded-full">
                        <Text className="text-white font-bold text-lg">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AlertBox;
