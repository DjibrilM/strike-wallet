import React, { useState } from "react";
import NumPad from "../../components/Common/NumPad";
import { SafeAreaView, Text } from "../../components/Tailwind";

const passcodeAreaInitialValue: {
  value: number | null;
  focused: boolean;
  filled: boolean;
}[] = [
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
];

const LockeScreen = () => {
  const [passcodeArea, setPassCodeArea] = useState(passcodeAreaInitialValue);

  return (
    <SafeAreaView className="flex-1">
      <NumPad
        onDelete={() => {}}
        onChange={() => {}}
        onpressBiomtricAuthorization={() => {}}
      />
    </SafeAreaView>
  );
};

export default LockeScreen;
