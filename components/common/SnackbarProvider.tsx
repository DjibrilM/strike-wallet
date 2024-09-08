//Not done yet
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { View, Text, TouchableOpacity } from '../Tailwind'

const SnackbarProvider = ({ children }: { children: React.JSX.Element }) => {
    return (
        <>
            <View className='w-full absolute left-0 right-0 bottom-[100px] z-[1000] flex justify-center items-center'>
                <View className='w-[90%] items-center justify-between py-2 flex-row px-3 min-h-[50px] rounded-lg bg-slate-700'>
                    <View className='flex-row items-center gap-2'>
                        <Feather name="copy" size={18} color="white" />
                        <Text style={{ fontFamily: "Nunito-Regular" }} className='text-slate-100'>copied</Text>
                    </View>
                    <TouchableOpacity>
                        <Text className='text-blue-100'>close</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {children}
        </>
    )
}

export default SnackbarProvider