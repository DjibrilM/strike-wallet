import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, ScrollView, SafeAreaView } from "../components/Tailwind";
import { CurrencyData } from "../util/shared/types";

const CurrencyDetailPage = () => {
    const route = useRoute();
    const { id} = route.params as CurrencyData;

    console.log(id);

  return <SafeAreaView className="flex-1"></SafeAreaView>;
};

export default CurrencyDetailPage;
