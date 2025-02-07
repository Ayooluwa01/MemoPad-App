import React, { useRef } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Sortlist from "./Sortlist";

const Bottomsheets = () => {
  const refRBSheet = useRef();
  return (
    <View style={{ flex: 1 }}>
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        // useNativeDriver={true}
        // draggable={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        customModalProps={{
          animationType: "fade",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <Sortlist />
      </RBSheet>
    </View>
  );
};
export default Bottomsheets;
