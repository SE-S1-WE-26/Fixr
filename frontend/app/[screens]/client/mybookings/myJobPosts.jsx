import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '../../../../components/common/Header'
import images from '../../../../constants/images'
import CustomButton from '../../../../components/common/CustomButton'
import icons from '../../../../constants/icons'
import TabIcon from '../../../../components/common/TabIcon'
import JobPostsBox from '../../../../components/client/JobPostsBox'
import { router } from 'expo-router'

const MyJobPosts = () => {
  return (
    <ScrollView className=" bg-white">
      <Header title={"My Job Posts"} />
      <View className="flex-col">
        <Image
          source={images.myJobPosts}
          className="mx-auto"
          resizeMode='contain'
        />
        <View className="relative w-full h-[120px] -mb-11 -mt-2">
          <CustomButton
            title={
              <View className="flex-row items-center">
                <Image
                  source={icons.plus}
                  tintColor={"black"}
                  className="w-6 h-6"
                  resizeMode='contain'
                />
                <Text className="font-semibold">  Add Job Posts</Text>
              </View>
            }
            containerStyles={"absolute right-4 top-4 w-40 h-12 rounded-full"}
          />
        </View>
        <JobPostsBox
        type={"plumbing"}
        topic={"Leaky Kitchen Sink"}
        description={"The faucet has a persistent drip, and there is also a small leak under the sink causing water damage to the cabinet below."}
        handlePressJob={() => router.push('./jobPost')}
        handlePressHandymen={() => router.push('./interestedHandymen')}
        />
        <JobPostsBox
        type={"plumbing"}
        topic={"Leaky Kitchen Sink"}
        description={"The faucet has a persistent drip, and there is also a small leak under the sink causing water damage to the cabinet below."}
        handlePressJob={() => router.push('./jobPost')}
        handlePressHandymen={() => router.push('./interestedHandymen')}
        />
        <JobPostsBox
        type={"plumbing"}
        topic={"Leaky Kitchen Sink"}
        description={"The faucet has a persistent drip, and there is also a small leak under the sink causing water damage to the cabinet below."}
        handlePressJob={() => router.push('./jobPost')}
        handlePressHandymen={() => router.push('./interestedHandymen')}
        />
      </View>
    </ScrollView>
  )
}

export default MyJobPosts