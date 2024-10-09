import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import icons from '../../constants/icons';

const ConfirmationBox = ({ visible, title, onConfirm, onCancel, message, image, onConfirmMesg, onCancelMsg, confirmButton, confirmColor, cancelColor, cancelTextStyle, confirmTextStyle }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            {/* Semi-transparent overlay to mimic blur */}
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className="bg-white rounded-lg px-6 py-5 w-11/12 max-w-md shadow-lg items-center mx-2 border">
                    {/* Icon */}
                    <Image
                        source={icons[image]}
                        className="w-14 h-14"
                        resizeMode="contain"
                    />

                    <Text className="text-xl font-bold mt-2">{title}</Text>

                    {/* Message */}
                    <Text className="text-center text-base mt-2 mb-4 text-gray-600">{message}</Text>

                    {/* Confirm Button */}
                    {confirmButton &&
                        <TouchableOpacity onPress={onConfirm} className={`bg-${confirmColor} w-full text-center py-2 rounded-lg items-center bg-green-700`}>
                            <Text className={`text-white font-semibold text-lg justify-center ${confirmTextStyle}`}>{onConfirmMesg}</Text>
                        </TouchableOpacity>
                    }

                    {/* Cancel Button */}
                    <TouchableOpacity onPress={onCancel} className={`bg-${cancelColor} border border-gray-300 mt-2 w-full text-center py-2 rounded-lg items-center`}>
                        <Text className={`font-semibold text-lg ${cancelTextStyle}`}>{onCancelMsg}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ConfirmationBox;
