import {Circle, H2, Text, View, XStack, YStack} from "tamagui";
import {ChevronRight} from "@tamagui/lucide-icons";
import {STATUS} from "../fixtures/todolist-fixture";

export default function TodolistCard({title, items, navigate}) {
    const pending = items.filter(item => item.completed === STATUS.pending).length;
    const completed = items.filter(item => item.completed === STATUS.completed).length;
    const waiting = items.filter(item => item.completed === STATUS.waiting).length;
    return (
        <XStack
            w="100%"
            bg="$background"
            borderRadius="$5"
            p="$4"
            gap="$4"
            onPress={() => navigate()}
            alignItems="center"
            shadowOffset={{ width: 4, height: 4 }}
            shadowColor="rgba(0, 0, 0, 0.25)"
            shadowRadius={5}
        >
            <YStack gap="$3" width="90%">
                <H2>{title}</H2>
                <XStack width="100%" justifyContent="space-between">
                    <XStack  alignItems='center' gap="$2">
                        <Circle size={10} backgroundColor="#3b82f6" />
                        <Text>{ `En attente: ${pending}` }</Text>
                    </XStack>
                    <XStack  alignItems='center' gap="$2">
                        <Circle size={10} backgroundColor="#fbbf24" />
                        <Text>{ `En cours: ${waiting}` }</Text>
                    </XStack>
                    <XStack  alignItems='center' gap="$2">
                        <Circle size={10} backgroundColor="#22c55e" />
                        <Text>{ `Terminée: ${completed}` }</Text>
                    </XStack>
                </XStack>
            </YStack>
            <View>
                <ChevronRight/>
            </View>
        </XStack>
    )
}