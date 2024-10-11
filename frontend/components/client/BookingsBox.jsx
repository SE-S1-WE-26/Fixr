import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter } from 'expo-router'
import images from '../../constants/images'
import icons from '../../constants/icons'
import ScanIcon from '../../components/client/home/ScanIcon'

const BookingsBox = ({ type, topic, handyman, date, time, amount, qrcode }) => {
    const router = useRouter();

    const handleNavigation = () => {
        // Navigate to Scanner screen and pass the expected QR code
        router.push({
            pathname: "/pages/client/mybookings/qrscanner",
            params: { qrcode },  // Passing the expected QR code
        });
    }

    return (
        <SafeAreaView className={`rounded-xl mt-3 mx-auto shadow-smw-[340px] w-11/12 h-60 border border-gray-300 flex flex-col`} >
            <View className='flex-row left-4 -mt-3'>
                <View className={`w-11 h-11 items-center rounded-full border border-gray-100`}>
                    <Image
                        source={images[type]}
                        className={` w-6 h-6 top-[7.17px]`}
                        resizeMethod='contain' />
                </View>
                <Text className={`text-center p-1 font-semibold text-lg`}>{topic}</Text>
            </View>
            <View className={'flex-row justify-between px-2'}>
                <Text className={`mt-1 text-base left-1`}>Handyman: {handyman}</Text>
                <TouchableOpacity onPress={handleNavigation}>
                    <ScanIcon icon={icons.scanner} />
                </TouchableOpacity>
            </View>
            <View className={`flex-row gap-1 mt-2 justify-center`}>
                <View className={`bg-blue-200 rounded-lg px-1 h-[30px] flex-row items-center gap-1`}>
                    <Image
                        source={icons.calendar}
                        className={`w-4 h-4 mb-1`}
                        resizeMode='contain'
                        tintColor={"black"}
                    />
                    <Text className={`text-xs mb-1`}>{date}</Text>
                </View>
                <View className={`bg-green-300 rounded-lg px-1 h-[30px] flex-row items-center gap-1`}>
                    <Image
                        source={icons.clock}
                        className={`w-4 h-4 mb-1`}
                        resizeMode='contain'
                        tintColor={"black"}
                    />
                    <Text className={`text-xs mb-1`}>{time}</Text>
                </View>
                <View className={`bg-amber-300 rounded-lg px-1 h-[30px] flex-row items-center gap-1`}>
                    <Image
                        source={icons.earnings}
                        className={`w-4 h-4 mb-1`}
                        resizeMode='contain'
                    />
                    <Text className={`text-xs mb-1`}>{amount}</Text>
                </View>
            </View>
            <View className={`flex-row mt-4 justify-between px-1`}>
                <View className={`bg-white border-2 border-yellow rounded-lg px-2.5 h-[30px] flex-row`}>
                    <TouchableOpacity>
                        <Text className="mt-0.5">Handyman Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className={`bg-white border-2 border-red-800 rounded-lg px-2.5 h-[30px] flex-row`}>
                    <TouchableOpacity >
                        <Text className="mt-0.5">Cancel Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookingsBox