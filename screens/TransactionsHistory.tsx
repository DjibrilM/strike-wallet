import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView } from '../components/Tailwind';
import TransactioElement from '../components/Common/TransactionElement';
import { Transaction } from '../data/Entities/transactions/transaction';
import useDBqueries from '../utils/hooks/useDBqueries';
import Visible from '../components/Common/Visibility';
import { RefreshControl } from 'react-native';


const TransactionsHistory = () => {
    const { getAllHistory } = useDBqueries();
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [history, setHistory] = useState<Transaction[]>([]);


    const getHistory = async () => {
        try {
            setLoadingHistory(true);
            const history = await getAllHistory() as Transaction[];
            setHistory(history);
            setLoadingHistory(false);
        } catch (error) {
            setLoadingHistory(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getHistory();
    }, [])


    return (
        <SafeAreaView>
            <ScrollView refreshControl={
                <RefreshControl refreshing={loadingHistory} onRefresh={getHistory} />
            }>
                <Visible condition={!loadingHistory && history.length < 1}>
                    <View className="flex justify-center items-center mt-8">
                        <Text className="font-semibold text-slate-700">No history yet</Text>
                        <Image className="h-32 w-32 mt-4" source={require('../assets/images/planet.png')} />
                    </View>
                </Visible>

                {history.map((tr: any, index) => (
                    <TransactioElement
                        key={"currency-detail-transaction-element-" + index}
                        {...tr}
                    />
                ))}


            </ScrollView>
        </SafeAreaView>
    )
}

export default TransactionsHistory

