import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from "react-native";

function BottomSheetComponent({ style } : {
  style?: object;
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['20%', '40%', '100%'];

  useEffect(() => {
    bottomSheetRef.current?.expand();
  },[]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          enableOverDrag
          style={{elevation: 50}}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
  );
}

export default BottomSheetComponent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

