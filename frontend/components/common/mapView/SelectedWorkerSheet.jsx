import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { useWorker } from "./WorkerProvider";
// import workerImage from '~/assets/worker.png';

import * as Location from 'expo-location';
import { getDirection } from "./direction";


export default function SelectedWorkerSheet() {
    const { selectedWorker, setDirection } = useWorker();

    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [rating, setRating] = useState();
    const [image, setImage] = useState();

    const bottonSheetRef = useRef(null);

    useEffect(() => {
        if (selectedWorker) {
            bottonSheetRef.current?.expand();
            setName(selectedWorker.name);
            setLocation(selectedWorker.address);
            setAge(selectedWorker.age);
            setPhone(selectedWorker.phone);
            setRating(selectedWorker.rating);
            setImage(selectedWorker.photo);

        } else {
            bottonSheetRef.current?.close();
        }
    }, [selectedWorker]);

    console.log('Selected Worker Sheet Rendered:', selectedWorker);

    const fetchDirections = async () => {
        console.log('fetchDirections From worker Provider');
        // Uncomment these lines if you want to enable directions fetching
        // const myLocation = await Location.getCurrentPositionAsync();
        // const newDirection = await getDirection(
        //     [myLocation.coords.longitude, myLocation.coords.latitude],
        //     [selectedWorker.longitude, selectedWorker.latitude]
        // );
        // setDirection(newDirection);
    }

    return (
        <BottomSheet ref={bottonSheetRef} index={-1} snapPoints={['20%']} enablePanDownToClose>
            <BottomSheetView style={{ flex: 1, padding: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image src={image} style={{ width: 50, height: 70 }} />

                    <View style={{ flexDirection: 'row', flex: 1, gap: 10, alignItems: 'center', marginStart: '5%' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text>Name</Text>
                            <Text>Age</Text>
                            <Text>Phone</Text>
                            <Text>Address</Text>
                            <Text>Rating</Text>
                        </View>
                        <View>
                            <Text>: {name}</Text>
                            <Text>: {age}</Text>
                            <Text>: {phone}</Text>
                            <Text>: {location}</Text>
                            <Text>: {rating}</Text>
                        </View>
                    </View>
                    <View>
                        <Button title="Get Direction" color={'yellow'} onPress={fetchDirections} />
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
}
