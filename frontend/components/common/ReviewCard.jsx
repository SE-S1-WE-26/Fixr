import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  SCREEN_HEIGHT,
} from "@gorhom/bottom-sheet";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReviewCardOne from "./ReviewCardOne";
import LottieView from "lottie-react-native"; // Import Lottie for animations

const ReviewWidget = (props) => {
  const bottomSheetRef = props.rating;
  const handleClosePress = () => bottomSheetRef?.current?.close();
  const [workerData, setWorkerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false); // New state for review submission

  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://fixerbackend.vercel.app/worker/mydata",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch worker data");
      }

      const data = await response.json();
      setWorkerData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  const handleAddReview = async () => {
    try {
      setIsAddingReview(true);
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://fixerbackend.vercel.app/worker/addreview",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: ratingValue,
            review: reviewText,
            userId: workerData.userId._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      const data = await response.json();
      console.log("Review added:", data);
      Alert.alert("Success", "Your review has been added successfully!");

      // Clear the review input and update the success state
      setReviewText("");
      setIsReviewSubmitted(true);
      fetchMyData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingReview(false);
    }
  };

  const StarRating = ({ rating, setRating }) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={{ marginHorizontal: 4 }}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={30}
              color={star <= rating ? "#f7ba02" : "#ccc"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={["71%"]} enablePanDownToClose>
      <BottomSheetScrollView style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView style={{padding:30}}>
            <ReviewCardOne workerData={workerData} />
          </ScrollView>
        )}
        </BottomSheetScrollView>
        {isReviewSubmitted && (
          <LottieView
            source={require("../../assets/SuccessLottie.json")}
            autoPlay
            loop={false}
            style={{ width: 200, height: 200, alignSelf: "center" , justifyContent: "center", alignItems: "center"}}
            onAnimationFinish={() => setIsReviewSubmitted(false)}
          />
        )||(        <View style={styles.reviewForm}>
          <Text style={styles.reviewTitle}>Add Your Review</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            value={reviewText}
            onChangeText={(text) => setReviewText(text)}
          />
          <Text style={styles.ratingTitle}>Your Rating</Text>
          <StarRating rating={ratingValue} setRating={setRatingValue} />
          <Button
            title="Submit Review"
            onPress={handleAddReview}
            disabled={isAddingReview}
          />
        </View>)}


      
    </BottomSheet>
  );
};

export default ReviewWidget;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  reviewForm: {
    margin: 10,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
