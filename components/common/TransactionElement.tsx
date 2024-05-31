import React from "react";
import { View, Text } from "../Tailwind";
import { cn } from "../../util/cn";
import { Transaction } from "../../util/shared/types";

import AntDesign from "@expo/vector-icons/AntDesign";
import Visible from "./Visibility";
import Feather from "@expo/vector-icons/Feather";

import ListTile from "./ListTile";
import { shortAddress } from "../../util/shortAddress";
import { currencies, walletAddress } from "../../util/shared/constant";

interface Props extends Transaction { 
  current_price:number
}

const TransactioElement: React.FC<Props> = (props) => {
  return (
    <ListTile
      trailing={
        <View>
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className={cn("text-[13px] text-right", {
              "text-blue-500": props.From === walletAddress,
            })}
          >
            {props.Value}
          </Text>

          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-[11px] text-right mt-1 text-slate-600"
          >
            ${(Number(props.Value.replace(/[a-zA-Z]/g, '')) * props.current_price).toFixed(4)}
          </Text>
        </View>
      }
      title={
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-base text-slate-700"
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
          <Visible condition={walletAddress === props.From}>
            <Feather name="arrow-up-right" size={18} color="#505050" />
          </Visible>

          <Visible condition={walletAddress !== props.From}>
            <AntDesign name="arrowdown" size={18} color="#505050" />
          </Visible>
        </View>
      }
    />
  );
};

export default TransactioElement;
