import React from "react";
import { View, Text } from "../Tailwind";
import { Transaction } from "../../util/shared/types";

import AntDesign from "@expo/vector-icons/AntDesign";
import ListTile from "./ListTile";
import { shortAddress } from "../../util/shortAddress";

interface Props extends Transaction {}

const TransactioElement: React.FC<Props> = (props) => {
  return (
    <ListTile
      trailing={<View>
        <Text>{ props.Value}</Text>
      </View>}
      title={
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="mt-1 text-base text-slate-700"
        >
          Transfer
        </Text>
      }
      subtitle={
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className=" text-slate-700 text-[12px]"
        >
          From:{shortAddress(props.From)}
        </Text>
      }
      conatinerClassName="my-4"
      leading={
        <View className="bg-gray-100 p-3 rounded-full">
          <AntDesign name="arrowup" size={18} color="#505050" />
        </View>
      }
    />
  );
};

export default TransactioElement;
