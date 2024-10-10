import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur"; // Import BlurView

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import workerImage from "../../assets/images/worker/worker.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewWidget = (props) => {
  const bottonSheetRef = props.rating;
  const handleClosePress = () => bottonSheetRef?.current?.close();

  const [workerData, setWorkerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [reviewText, setReviewText] = useState("");
  const [ratingValue, setRatingValue] = useState(5);

  const [reviews, setReviews] = useState([]);
  const [isAddingReview, setIsAddingReview] = useState(false);

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

      fetchMyData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingReview(false);
    }
  };

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

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data);
      console.log("Fetched reviews:", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (workerData) {
      fetchReviews();
    }
  }, [workerData]);

  // Star Rating Component
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
              color={star <= rating ? "#f7ba02" : "#ccc"} // Filled or outlined stars
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <>
      <BottomSheet
        ref={bottonSheetRef}
        index={-1}
        snapPoints={["71%"]}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: "transparent",
          shadowColor: "black",
          backgroundColor: "white",
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 20,
            paddingTop: 0,
            // backgroundColor: "#f59e2b",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            {/* <View style={styles.header}>
              <Text style={[styles.textYellow, { fontWeight: "bold" }]}>
                ⭐ 4.1
              </Text>
              <Text style={[styles.textPrimary, { fontSize: 20         }]}>
                {workerData?.userId?.name}
              </Text>
              <TouchableOpacity onPress={handleClosePress}>
                <Image
                  src={
                    "https://img.icons8.com/?size=100&id=79023&format=png&color=000000"
                  }
                  style={styles.cross}
                />
              </TouchableOpacity>
            </View> */}

            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ScrollView style={{ flexGrow: 1 }}>
                <View style={{ paddingTop: 1 }}>
                  <View style={{ marginTop: 16 }}>
                    {reviews.length > 0 ? (
                      reviews.map((reviewItem, index) => (
                        <ReviewCardOne
                          key={index}
                          name="Anonymous"
                          rating={parseInt(reviewItem.rating)}
                          review={reviewItem.review}
                        />
                      ))
                    ) : (
                      <Text>No reviews available</Text>
                    )}
                  </View>
                </View>
              </ScrollView>
            )}

            <View style={{ marginTop: 16, marginBottom: 10 }}>
              <Text style={styles.title}>Add a Review</Text>

              <TextInput
                placeholder="Write your review here"
                value={reviewText}
                onChangeText={setReviewText}
                style={styles.textInput}
                multiline
              />

              <Text style={styles.label}>Rate this worker:</Text>
              <StarRating rating={ratingValue} setRating={setRatingValue} />

              <Button
                title={isAddingReview ? "Submitting..." : "Submit Review"}
                onPress={handleAddReview}
                disabled={isAddingReview}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

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

const ReviewCardOne = ({ name, rating, review }) => {
  return (
    <View style={[styles.cardContainer, { marginBottom: 16 }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={workerImage} style={styles.avatar} />
        <View>
          <Text style={styles.textPrimary}>
            {name} <Text style={styles.textGreen}>✔️ Verified Account</Text>
          </Text>
          <View style={{ flexDirection: "row" }}>{renderStars(rating)}</View>
          <TouchableOpacity>
            <Text style={styles.button}>read more</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={[
          styles.textMuted,
          { marginTop: 8, marginLeft: 40, textAlign: "left" },
        ]}
      >
        {review}
      </Text>
      <TouchableOpacity>
        <Text style={[styles.button, { marginTop: 8, textAlign: "right" }]}>
          reply
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewWidget;

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
    backgroundColor: "#f59e2b",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
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
  textYellow: {
    color: "#ffc400",
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
  cross: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    // borderBottomColor: "#e5e7eb",
    padding: 10,
    opacity: 1,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
});
