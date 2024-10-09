import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import workerImage from '../../assets/images/worker/worker.png';

// Shared styles using StyleSheet
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f3f4f6', // equivalent to bg-zinc-100
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    transform: [{ scale: 1 }],
  },
  textPrimary: {
    color: '#1d4ed8', // text-primary
    fontWeight: '600',
  },
  textYellow: {
    color: '#eab308', // text-yellow-500
  },
  textGreen: {
    color: '#16a34a', // text-green-500
  },
  textMuted: {
    color: '#6b7280', // text-muted-foreground
  },
  button: {
    color: '#3b82f6', // text-blue-500
    textDecorationLine: 'underline',
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
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // border-border equivalent
    paddingBottom: 10,
  },
});

const Widget = (props) => {
  const bottonSheetRef = props.rating;
  const handleClosePress = () => bottonSheetRef.current.close();

  return (
    <>
      <BottomSheet ref={bottonSheetRef} index={-1} snapPoints={['75%']} enablePanDownToClose>
        <BottomSheetView style={{ flex: 1, width: "100px", padding: 10 }}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={[styles.textYellow, { fontWeight: 'bold' }]}>⭐ 4.1</Text>
              <Text style={[styles.textPrimary, { fontSize: 18 }]}>Amila Fernando</Text>
              <TouchableOpacity onPress={handleClosePress}>
                <Image src={'https://img.icons8.com/?size=100&id=79023&format=png&color=000000'} style={styles.cross} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.textPrimary, { fontSize: 16, padding: 10 }]}>Reviews</Text>
            <ScrollView>
              <View style={{ paddingTop: 1 }}>
                <View style={{ marginTop: 16 }}>
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                </View>
              </View>
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const ReviewCard = ({rating }) => {
  return (
    <View style={[styles.cardContainer, { marginBottom: 16 }]}>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={workerImage} style={styles.avatar} />
          <View>
            <Text style={styles.textPrimary}>
              Nuwan Prasad <Text style={styles.textGreen}>✔️ Verified Account</Text>
            </Text>
            <Text style={styles.textYellow}>⭐⭐⭐⭐⭐</Text>
            <TouchableOpacity>
              <Text style={styles.button}>read more</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.textMuted, { marginTop: 8 }]}>
        John Mayers is so professional, I will recommend him everywhere. Thank you!
        </Text>
        <TouchableOpacity>
          <Text style={[styles.button, { marginTop: 8 }]}>reply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Widget;
