import {View, Text, YStack, Spinner} from "tamagui";
import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import data from "../../fixtures/todolist-fixture";

export default function Todolist() {
    const { id } = useLocalSearchParams();
    const [todolist, setTodolist] = useState();
    useEffect(() => {
        setTimeout(() => setTodolist(data.todolists[id]), 2000);
    }, []);

    return(
        <YStack fullscreen bg="#F1F5F9" pt="$5">
            {
                todolist &&
                <View>
                    <Text>{todolist.title}</Text>
                    {
                        todolist.items.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text>{item.title}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            }
            {
                !todolist &&
                <YStack fullscreen justifyContent="center" alignItems="center">
                    <Spinner size="large" color="$orange10" />
                    <Text>Chargement...</Text>
                </YStack>

            }
        </YStack>
    )
}