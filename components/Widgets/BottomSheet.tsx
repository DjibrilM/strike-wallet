import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { BottomSheetView, BottomSheetModal } from "@gorhom/bottom-sheet";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onChange?: (index: number) => void;
  customSnapPoints?: string[];
}

const CustomBottomSheet = forwardRef(
  ({ children, customSnapPoints, onChange }: Props, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleClose = useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);

    const handleOpen = useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          close: handleClose,
          open: handleOpen,
        };
      },
      []
    );

    const snapPoints = useMemo(
      () => customSnapPoints || ["50%"],
      [customSnapPoints]
    );

    return (
      <BottomSheetModal
        onMagicTap={handleClose}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={onChange}
        backdropComponent={({ style }) => (
          <Pressable style={[style]} onPress={handleClose}>
            <Animated.View
              style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
            />
          </Pressable>
        )}
        stackBehavior="push"
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default CustomBottomSheet;
