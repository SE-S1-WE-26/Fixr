import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location'
import { getDirection } from "./direction";


const WorkerContext = createContext({});

export default function WorkerProvider({children}: PropsWithChildren){
    const [selectedWorker , setSelectedWorker] = useState();
    const [direction , setDirection] = useState();
    const [ showRatings , setShowRatings] = useState(false);

    useEffect(() => {
        const fetchDirections = async () => {
            

            console.log('fetchDirections From worker Provider');
    // const myLocation = await Location.getCurrentPositionAsync();

    // const newDirection = await getDirection(
    // [myLocation.coords.longitude , myLocation.coords.latitude],
    // [selectedWorker.longitude , selectedWorker.latitude]
    // );
    // setDirection(newDirection);
        }

        if(selectedWorker){
            fetchDirections();
        }
    }, [selectedWorker]);

    return(
        <WorkerContext.Provider value={
            {
                selectedWorker , 
                setSelectedWorker , 
                setDirection,
                direction , 
                directionCoordinate : direction?.routes?.[0]?.geometry?.coordinates,
                duration : direction?.routes?.[0]?.duration,
                distance : direction?.routes?.[0]?.distance
                }}>
        {children}
        </WorkerContext.Provider>

    );
}
export const useWorker = () => useContext(WorkerContext);