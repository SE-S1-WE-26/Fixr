import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../../../constants";

const ImageItem = ({ uri }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ marginHorizontal: 8, borderRadius: 12, overflow: "hidden" }}>
      {loading && (
        <View style={{ 
          position: 'absolute', // Position absolute to overlay on the image
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, // Fill the parent container
          justifyContent: 'center', // Center vertically
          alignItems: 'center', // Center horizontally
          backgroundColor: 'rgba(128, 128, 128, 0.2)' // Optional: semi-transparent background
        }}>
          <ActivityIndicator size="large" color="#F59E2B" />
        </View>
      )}
      <Image
        source={{ uri }}
        style={{ height: 200, width: 300 }} // Fixed height, auto width
        resizeMode="cover" // Maintain aspect ratio
        onLoad={() => setLoading(false)} // Set loading to false when the image is loaded
        onError={() => setLoading(false)} // Handle error case by stopping the loader
      />
    </View>
  );
};

const JobInfo = ({ job, loading, jobCost }) => {
  if (loading) {
    return <View className="flex w-full mb-32 justify-center items-center">
    <ActivityIndicator size="large" color="orange" />
  </View>
  }

  if (!job) {
    return (
      <View>
        <Text>No job details available</Text>
      </View>
    );
  }

  return (
    <>
      <View className="px-6">
        <Text className="text-3xl font-bold">{job.title}</Text>
      </View>
      <View className="flex mt-6 rounded-xl bg-powder shadow px-5 py-5 mx-6">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="text-base font-medium">Location</Text>
            <Text className="text-lg font-bold">{job.city}, Sri Lanka</Text>
          </View>
          <View className='items-end'>
            <Text className="text-base font-medium">Est. Job Time</Text>
            <Text className="text-4xl font-bold text-orange">
              {job.estDuration} Hours
            </Text>
          </View>
        </View>
        <Text className="my-6">{job.description}</Text>
        <View>
          {job.images && job.images.length > 0 ? (
            <FlatList
              horizontal
              data={job.images}
              renderItem={({ item }) => <ImageItem uri={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                height: 150, // Same height as the image item
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0", // Light grey background
                borderWidth: 1,
                borderColor: "#d1d1d1", // Border color
                borderRadius: 12, // Rounded corners
                marginHorizontal: 8, // Margin to match the FlatList items
              }}
            >
              <Text style={{ color: "#888888" }}>No images available</Text>
            </View>
          )}
        </View>
        <View className="mt-8">
          <Text className="text-base font-medium">Est. Job Cost</Text>
          <Text className="text-4xl font-bold text-orange">
            LKR {jobCost}
          </Text>
        </View>
      </View>
    </>
  );
};

export default JobInfo;
