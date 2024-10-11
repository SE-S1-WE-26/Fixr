import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet ,ScrollView} from "react-native";
import workerImage from "../../assets/images/worker/worker.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native"; // Import Lottie

const ReviewCardOne = ({ workerData }) => {
  const [reviews, setReviews] = useState([]);
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const fetchReviews = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://fixerbackend.vercel.app/worker/getonereview/${workerData?.userId?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    //   if (!response.ok) {
    //     throw new Error("Failed to fetch reviews");
    //   }

      const data = await response.json();
      setReviews(data);
      console.log("Fetched reviews:", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setIsDeletingReview(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `http://192.168.37.210:8010/worker/deletereview/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      const data = await response.json();
      console.log("Review deleted:", data);

      // Show success animation
      setShowSuccessAnimation(true);

      setTimeout(() => {
        setShowSuccessAnimation(false);
        // Alert.alert("Success", "Your review has been deleted successfully!");
        fetchReviews(); // Refresh reviews
      }, 2000); // Delay to show animation

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete review");
    } finally {
      setIsDeletingReview(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<Text key={i}>⭐</Text>);
    }
    for (let i = rating; i < 5; i++) {
      stars.push(<Text key={i}>☆</Text>);
    }
    return stars;
  };

  return (
    <>
      {showSuccessAnimation && (
        <LottieView
          source={require("../../assets/deleteReviewLottie.json")}
          autoPlay
          loop={false}
          style={{ width: 150, height: 150, alignSelf: "center" }}
        />
      )}

      {!showSuccessAnimation && (
        <>


          {/* Display Reviews */}
          {reviews.length > 0 ? (
            reviews.map((reviewItem, index) => (
              <View style={[styles.cardContainer, { marginBottom: 16 }]} key={index}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={workerImage} style={styles.avatar} />
                  <View>
                    <Text style={styles.textPrimary}>
                      {reviewItem.name} <Text style={styles.textGreen}>✔️ Verified Account</Text>
                    </Text>
                    <View style={{ flexDirection: "row" }}>{renderStars(reviewItem.rating)}</View>
                    <TouchableOpacity>
                      <Text style={styles.button}>read more</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.textMuted, { marginTop: 8, textAlign: "center", fontWeight: "bold" }]}>
                  {reviewItem.review}
                </Text>
                <View className="flex flex-row justify-between">
                  <View className="px-2 py-1 m-2 font-semibold bg-blue-200 rounded-lg">
                    <TouchableOpacity>
                      <Text>Reply</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="px-2 py-1 m-2 font-semibold bg-red-200 rounded-lg">
                    <TouchableOpacity onPress={() => handleDeleteReview(reviewItem._id)}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text>No reviews available</Text>
          )}
        </>
      )}
    </>
  );
};

export default ReviewCardOne;

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "#f3f4f6",
      padding: 16,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    textPrimary: {
      color: "black",
      fontWeight: "600",
    },
    textGreen: {
      color: "#16a34a",
    },
    textMuted: {
      color: "#6b7280",
    },
    button: {
      color: "#3b82f6",
      textDecorationLine: "underline",
    },
    avatar: {
      width: 35,
      height: 50,
      borderRadius: 20,
      marginRight: 8,
    },
    inputContainer: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 8,
      marginRight: 8,
    },
    submitButton: {
      backgroundColor: "#3b82f6",
      padding: 10,
      borderRadius: 8,
    },
    submitText: {
      color: "#fff",
      fontWeight: "600",
    },
  });