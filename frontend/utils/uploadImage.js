// uploadImage.util.js
import { Alert } from "react-native";
import { storage } from "./firebaseConfig"; // Adjust the import path based on your structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary methods

const uploadImages = async ({ folder, imageURIs }) => {
    const downloadURLs = [];

    for (const uri of imageURIs) {
        const response = await fetch(uri);
        const blob = await response.blob();

        // Create a reference to the storage bucket location
        const imageRef = ref(storage, `${folder}/${Date.now()}.jpg`); // Use ref function to create a reference

        console.log("Uploading image to Firebase Storage..."); // Debug line

        // Upload the image to Firebase Storage
        try {
            await uploadBytes(imageRef, blob); // Use uploadBytes instead of put
            const downloadURL = await getDownloadURL(imageRef); // Get the download URL
            console.log("Image uploaded successfully. Download URL:", downloadURL); // Debug line
            downloadURLs.push(downloadURL); // Add download URL to the array
        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("Error uploading image");
        }
    }

    return downloadURLs; // Return all download URLs for further use
};

export default uploadImages;
