import {YStack} from 'tamagui'
import TodolistCard from "../../components/TodolistCard";
import data from "../../fixtures/todolist-fixture";
import {useState} from "react";
import {router} from "expo-router";

export default function TabOneScreen() {
  const [todolists, setTodolists] = useState(data.todolists);

  return (
    <YStack f={1} ai="center" gap="$4" px="$2" pt="$5" bg="#F1F5F9" fullscreen>
      {
        todolists.map((todolist, index) =>
        {
          return (<TodolistCard
                key={todolist.title}
                title={todolist.title}
                items={todolist.items}
                deleteTodolist={() => null}
                navigate={() => router.replace(`todolist/${index}`)}
            />)
        }
        )
      }
    </YStack>
  )
}
