import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from "react-native";
import useSelectedSpecialist from "@/hooks/useSelectedSpecialist";
import SheetCollapsed from "@/screens/SheetCollapsed";
import SheetMiddle from "@/screens/SheetMiddle";
import SheetExpanded from "@/screens/SheetExpanded";




function BottomSheetComponent({ style } : {
  style?: object;
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['30%', '50%', '100%'];
  const [index, setIndex] = useState(0);
  
  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
    setIndex(index);
    
  }
  useEffect(() => {
    bottomSheetRef.current?.expand();
  },[]);

  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();


  return (
        <BottomSheet
          enableOverDrag
          style={{elevation: 50}}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            {/* {
              index === 0 ? 
                <SheetCollapsed />
              : index === 1 ?
                <SheetMiddle />
              : index === 2 ?
                <SheetExpanded />
              : null
            } */}
            <SheetCollapsed />
            {/* {selectedSpecialist && <Text>{selectedSpecialist.name}</Text>}
            {!selectedSpecialist && <Text>Showing specialists nearby</Text>} */}
          </BottomSheetView>
        </BottomSheet>
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

