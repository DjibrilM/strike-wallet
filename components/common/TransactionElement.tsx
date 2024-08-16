import React, { useMemo, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text, Modal, Pressable, Image } from "../Tailwind";

import { cn } from "../../utils/cn";
import { Transaction } from "../../utils/shared/types";
import Visible from "./Visibility";

import ListTile from "./ListTile";
import { shortAddress } from "../../utils/shortAddress";
import { walletAddress } from "../../utils/shared/constant";
import { Platform } from "react-native";

interface Props extends Transaction {
  current_price: number;
}

const TransactioElement: React.FC<Props> = (props) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const date = useMemo(() => new Date(props["DateTime (UTC)"]), []);

  return (
    <>
      <ListTile
        onPress={() => setOpenDetailModal(true)}
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
              $
              {(
                Number(props.Value.replace(/[a-zA-Z]/g, "")) *
                props.current_price
              ).toFixed(4)}
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
        conatinerClassName="my-2 px-4"
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
      <Modal
        onRequestClose={() => setOpenDetailModal(false)}
        animationType="slide"
        visible={openDetailModal}
      >
        <View className="px-4 w-full flex justify-center items-center">
          <View
            className={cn("px-4 mt-10 flex flex-row w-full items-center", {
              "mt-20": Platform.OS === "ios",
            })}
          >
            <Pressable onPress={() => setOpenDetailModal(false)}>
              <Ionicons name="chevron-back-outline" size={25} color="#1354fe" />
            </Pressable>

            <Text
              style={{ fontFamily: "Nunito-SemiBold" }}
              className="text-center mx-auto text-slate-800 text-[20px]"
            >
              Transfer
            </Text>
          </View>
          <View className="relative left-3 mt-10 mx-auto">
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="text-2xl text-slate-700"
            >
              {props.Value}
            </Text>
            <Text className="text-center mt-2 text-slate-600">
              ≈$
              {(
                Number(props.Value.replace(/[a-zA-Z]/g, "")) *
                props.current_price
              ).toFixed(4)}
            </Text>
          </View>

          <View className="bg-gray-100  my-5 w-full rounded-[20px]">
            {props.Status === "Success" && (
              <View className="mx-auto mt-4">
                <Image
                  className="w-20 h-20 mx-auto"
                  source={require("../../assets/images/checked.png")}
                  width={40}
                  height={10}
                />

                <Text
                  style={{ fontFamily: "Nunito-Bold" }}
                  className="text-2xl text-center text-slate-700 my-2"
                >
                  Confirmed
                </Text>
              </View>
            )}

            {props.Status === "Fail" && (
              <View className="mt-4 mx-auto">
                <Image
                  className="w-20 h-20"
                  source={require("../../assets/images/cancel.png")}
                  width={40}
                  height={10}
                />
                <Text
                  style={{ fontFamily: "Nunito-Bold" }}
                  className="text-2xl text-center text-slate-700 my-2"
                >
                  Failed
                </Text>
              </View>
            )}

            <View className="flex flex-row mt-10 px-4 justify-between">
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-[18px]"
              >
                Amount
              </Text>

              <View className="">
                <Text style={{ fontFamily: "Nunito-Regular" }}>
                  {props.Value}
                </Text>
                <Text
                  style={{ fontFamily: "Nunito-Regular" }}
                  className="text-right text-slate-600 mt-1"
                >
                  $
                  {(
                    Number(props.Value.replace(/[a-zA-Z]/g, "")) *
                    props.current_price
                  ).toFixed(4)}
                </Text>
              </View>
            </View>

            <View className="border-b my-6 border-[#0000001c] mx-2"></View>
            <View className="flex flex-row justify-between px-4">
              <Text
                className="text-slate-600"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                From
              </Text>
              <Text style={{ fontFamily: "Nunito-Regular" }}>
                {shortAddress(props.From)}
              </Text>
            </View>

            <View className="flex mt-6 flex-row justify-between px-4">
              <Text
                className="text-slate-600"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                To
              </Text>
              <Text style={{ fontFamily: "Nunito-Regular" }}>
                {shortAddress(props.From)}
              </Text>
            </View>

            <View className="flex mt-6 flex-row justify-between px-4">
              <Text
                className="text-slate-600"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                Date
              </Text>
              <Text style={{ fontFamily: "Nunito-Regular" }}>
                /{date.getMonth()}/{date.getDay()}/{date.getFullYear()}
              </Text>
            </View>

            <View className="flex mt-6 pb-16 flex-row justify-between px-4">
              <Text
                className="text-slate-600"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                Block Number
              </Text>
              <Text style={{ fontFamily: "Nunito-Regular" }}>
                {props.Blockno}
              </Text>
            </View>
          </View>

          <View className="px-4 py-6 bg-gray-100 flex justify-between flex-row items-center w-full rounded-[20px]">
            <Text
              className="text-slate-600"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              More Details
            </Text>

            <FontAwesome6 name="chevron-right" size={20} color="#757575" />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TransactioElement;
