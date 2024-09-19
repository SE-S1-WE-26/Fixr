import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '../../../../components/common/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import JobTypeIconBar from '../../../../components/client/JobTypeIconBar'
import InterestedHandyman from '../../../../components/client/InterestedHandyman'
import { router } from 'expo-router'

const InterestedHandymen = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView>
                {/* Header */}
                <View className="w-full px-4 md:px-6">
                    <Text className="text-3xl md:text-4xl font-bold">Interested Handymen</Text>
                </View>
                <JobTypeIconBar
                type={"repair"}
                />
                <Text className="text-center mt-2 text-lg font-medium">Roof Shingle Replacement</Text>
                <View className="flex-col mt-2">
                    <InterestedHandyman
                    handyman={"Amila Fernando"}
                    isFavourite={false}
                    jobTitle={"Construction Engineer"}
                    rate={"500.00"}
                    rating={3}
                    viewProfileHandlePress={() => router.push("")}
                    scheduleAppointmentHandlePress={() => router.push("")}
                    />
                    <InterestedHandyman
                    handyman={"Amila Fernando"}
                    isFavourite={false}
                    jobTitle={"Construction Engineer"}
                    rate={"500.00"}
                    rating={4.5}
                    viewProfileHandlePress={() => router.push("")}
                    scheduleAppointmentHandlePress={() => router.push("")}
                    />
                    <InterestedHandyman
                    handyman={"Amila Fernando"}
                    isFavourite={false}
                    jobTitle={"Construction Engineer"}
                    rate={"500.00"}
                    rating={4}
                    viewProfileHandlePress={() => router.push("")}
                    scheduleAppointmentHandlePress={() => router.push("")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default InterestedHandymen