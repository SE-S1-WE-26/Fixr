import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { useWorker } from "./WorkerProvider";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { getDirection } from "./direction";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SelectedWorkerSheet() {
  const { selectedWorker, setDirection, distance, duration } = useWorker();

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();
  const [service, setService] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [_duration, setDuration] = useState();
  const [_distance, setDistance] = useState();

  const bottonSheetRef = useRef(null);

  useEffect(() => {
    if (selectedWorker) {
      bottonSheetRef.current?.expand();
      setName(selectedWorker.name);
      setLocation(selectedWorker.address);
      setAge(selectedWorker.age);
      setPhone(selectedWorker.phone);
      setRating(selectedWorker.rating);
      setService(selectedWorker.service);
      setCategory(selectedWorker.category);
      setImage(selectedWorker.photo);
      setDistance("");
      setDuration("");
      setDirection();
    } else {
      bottonSheetRef.current?.close();
    }
  }, [selectedWorker]);

  console.log("Selected Worker Sheet Rendered:", selectedWorker);

  const fetchDirections = async () => {
    console.log("fetchDirections From worker Provider");
    // Uncomment these lines if you want to enable directions fetching

    const myLocation = await Location.getCurrentPositionAsync();
    const newDirection = await getDirection(
      [myLocation.coords.longitude, myLocation.coords.latitude],
      [selectedWorker.longitude, selectedWorker.latitude]
    );
    setDirection(newDirection);
    setDuration(newDirection.routes[0].duration);
    setDistance(newDirection.routes[0].distance);
  };

  return (
    <BottomSheet
      ref={bottonSheetRef}
      index={-1}
      snapPoints={["50% , 30%, 100%"]}
      enablePanDownToClose
    >
      <BottomSheetView
        style={{ flex: 1, padding: 10, backgroundColor: "#D8D2C2" }}
      >
        <Text className="font-bold bg-[#D8A25E] p-2 text-black  text-base text-center rounded-lg pl-5 m-2 ">
          <Octicons name="feed-person" size={18} color="black" />
          {"    "}
          {name}
        </Text>
        <Text className="font-bold  px-2 text-black  text-base text-center rounded-t-lg pl-5 mt-2 bg-black-500 text-white">
          <MaterialIcons name="home-repair-service" size={18} color="white" />
          {"   service      "}
        </Text>
        <Text className="font-bold  px-2 text-black  text-base text-center rounded-b-lg pl-5 mb-2 bg-black-400 p-1">
          {service}
        </Text>
        <View className="flex-row items-center gap-3">
          <Image src={image} className="w-[50px] h-[70px] rounded-xl " />

          <View className="flex flex-row flex-1 gap-2 items-center ms-2">
            <View className="items-start gap-1">
              <Text className="font-semibold">Age</Text>
              <Text className="font-semibold">Phone</Text>
              <Text className="font-semibold">Address</Text>
              <Text className="font-semibold">Rating</Text>
              <Text className="font-semibold">Category</Text>
            </View>
            <View className="items-start gap-1">
              <Text className="font-medium ">: {age}</Text>
              <Text className="font-medium">: {phone}</Text>
              <Text className="font-medium">: {location}</Text>
              <Text className="font-medium">
                : <MaterialCommunityIcons name="star" size={16} color="red" />
                {rating}
              </Text>
              <Text className="font-medium">: {category}</Text>
            </View>
          </View>
          <View className="items-end">
            {_distance && (
              <View className="flex flex-row items-end ">
                <View className="items-end p-1">
                  {(_distance && (
                    <Text className="font-medium items-end bg-green-600 text-white p-2 rounded-md m-1">
                      <FontAwesome5 name="running" size={20} color="black" />
                      {"  "}
                      {(_distance / 1000).toFixed(1)} km
                    </Text>
                  )) || <Text className="font-medium">: Not Available</Text>}

                  {(_duration && (
                    <Text className="font-medium items-end bg-blue-600 text-white p-2 rounded-md m-1">
                      <Feather name="clock" size={20} color="black" />
                      {"  "}
                      {(_duration / 60).toFixed(0)} Min
                    </Text>
                  )) || <Text className="font-medium">: Not Available</Text>}
                </View>
              </View>
            )}
            {!_duration && (
              <View className="max-w-[110]">
                <TouchableOpacity
                  className="flex-row items-center bg-[#A04747] p-3 rounded-md"
                  onPress={fetchDirections}
                >
                  <MaterialCommunityIcons
                    name="map-search"
                    size={28}
                    color="white"
                  />
                  <Text className="text-white font-medium ml-2">
                    {" "}
                    Get Direction
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity>

        <View className="items-center p-3">
          <View className="items-center bg-green-800 py-2 px-4 rounded-xl text-white flex-row justify-center w-fit">
            <Feather name="phone-call" size={24} color="white" />
            <Text className="font-medium text-white">
              {"    "}
              {phone}
            </Text>
          </View>
        </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
}
