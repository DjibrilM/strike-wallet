import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AlertNotificationRoot, ALERT_TYPE } from "react-native-alert-notification";

import { Modal, View, Text, SafeAreaView, TouchableOpacity, Image } from "../Tailwind";
import Button from "../Widgets/Button";
import { useWallet } from "../../states/wallet";
import Visible from "./Visibility";
import useDialogue from "../../utils/hooks/useDialogue";
import { sendEth } from "../../utils/web3/ethers";
import { sendEthereumToken } from "../../utils/web3/ethers";
import { cn } from "../../utils/cn";

interface Props {
    opened: boolean;
    tokenName: string;
    tokenLogoUrl: string;
    onclose: () => void;
    amount: string;
    gasFees: number;
    gasPriceInUsd: number;
    recipient: string,
    contractAddress?: string,
}

const TransactionConfirmationModal: React.FC<Props> = ({ opened, tokenName, tokenLogoUrl, gasFees, onclose, amount, gasPriceInUsd, recipient, contractAddress }) => {
    const { nativeEthereumBalance, privateKey, address } = useWallet();
    const [isTransacting, setIsTransacting] = useState(false);
    const { showToast } = useDialogue()

    const sendToken = async () => {

        if (contractAddress) {

            try {
                setIsTransacting(true)
                await sendEthereumToken({ recipient, value: amount, privateKey: privateKey, contractAddress: "0x0CE7f7E03fAA4E9b7905a15F42c1DFAe3FC8DB23", address });
                setIsTransacting(false);
                showToast({ type: ALERT_TYPE.SUCCESS, message: "Transaction completed succesfully.", title: "Success" });

            } catch (error) {
                showToast({ type: ALERT_TYPE.DANGER, message: "Failed to process the transaction", title: "Failed" });
                setIsTransacting(false);
                console.log(error);
            }

        } else {
            try {
                setIsTransacting(true)
                await sendEth({ recipient, value: amount, privateKey: privateKey, });
                setIsTransacting(false);
                showToast({ type: ALERT_TYPE.SUCCESS, message: "Transaction completed succesfully.", title: "Success" });


            } catch (error) {
                showToast({ type: ALERT_TYPE.DANGER, message: "Failed to process the transaction", title: "Failed" });
                setIsTransacting(false);
                console.log(error);
            }
        }

    }

    return (
        <Modal animationType='slide' visible={opened}>
            <AlertNotificationRoot>
                <SafeAreaView className="">
                    <View className="px-4 justify-between h-full mt-3">
                        <View>
                            <View className="flex-row items-center">
                                <TouchableOpacity disabled={isTransacting} onPress={onclose} className={cn("flex  gap-1 items-center flex-row py-2 px-2 rounded-xl", {
                                    "opacity-30": isTransacting
                                })}>
                                    <Ionicons name="chevron-back-sharp" size={20} color="#5a8dfe" />
                                    <Text className="text-blue-600">Go back</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="p-3 mt-6 rounded-lg flex-row items-center bg-black/5">
                                <Image className="h-6 w-6 mr-2" source={{ uri: tokenLogoUrl }}></Image>
                                <Text className="text-slate-600">You are Sending {amount} {tokenName} </Text>
                            </View>

                            <View className="p-3 bg-black/5 mt-4 rounded-lg">
                                <View className="flex-row justify-between">
                                    <Text className="text-slate-600 font-semibold">Transaction fees</Text>
                                    <View className="">
                                        <Text className="text-right text-slate-600">${gasFees.toFixed(6)} ETH</Text>
                                        <Text className="text-right mt-2 text-slate-600">${gasPriceInUsd.toFixed(5)} $</Text>
                                    </View>
                                </View>
                            </View>


                            <Visible condition={gasFees > (nativeEthereumBalance!)}>
                                <View className="p-3 border border-red-300 bg-red-100 mt-4 rounded-lg">
                                    <Text className="text-slate-600 font-semibold">Insufficient fees</Text>
                                    <View className="flex w-full mt-3 flex-row justify-between">
                                        <Text className="text-sm text-slate-500">Estimated gas fees</Text>
                                        <Text>{gasFees} ETH</Text>

                                    </View>

                                    <View className="flex w-full mt-3 flex-row justify-between">
                                        <Text className="text-sm text-slate-500">ETH balance</Text>
                                        <Text>{nativeEthereumBalance} ETH</Text>
                                    </View>


                                </View>
                            </Visible>
                        </View>

                        <View className="flex gap-4 mb-10 flex-row w-full mt-4">
                            <Button loading={isTransacting} disabled={isTransacting} onPress={sendToken} label="Continue" className="flex-grow" />
                        </View>
                    </View>
                </SafeAreaView>
            </AlertNotificationRoot>
        </Modal >
    );
};

export default TransactionConfirmationModal;
