import {Button, YStack} from 'tamagui'
import TodolistCard from "../../components/TodolistCard";
import data from "../../fixtures/todolist-fixture";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {supabase} from "../../utils/database";

export default function Home() {
  const [todolists, setTodolists] = useState([]);

  const getTodolists = async () => {
    const { data, error } = await supabase.from('todolist').select();
    console.log(data, error)
    if(error) {
      setTodolists([]);
    }

    setTodolists(data);
  }

  useEffect(() => {
      getTodolists();

    const todolist = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'todolist' },
            (payload) => {
              setTodolists([...todolists, payload.new])
            }
        )
        .subscribe()
  }, []);

  return (
    <YStack f={1} ai="center" gap="$4" px="$2" pt="$5" bg="#F1F5F9" fullscreen>
      {
        todolists.map((todolist, index) =>
        {
          return (<TodolistCard
                key={todolist.label}
                title={todolist.label}
                items={todolist.items}
                deleteTodolist={() => null}
                navigate={() => router.replace(`todolist/${index}`)}
            />)
        }
        )
      }
      <Button onPress={() => router.replace("/todolist/create")}>Créer une nouvelle todolist</Button>
    </YStack>
  )
}
