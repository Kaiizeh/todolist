import {Button, Spinner, YStack} from "tamagui";
import FormInput from "../../../components/FormInput";
import {useEffect, useState} from "react";
import {supabase} from "../../../utils/database";
import {useSession} from "../../../ctx";
import {router} from "expo-router";

export default function CreateTodolist(){
    const { session } = useSession()
    const [isLoading, setIsLoading] = useState();
    const [id, setId] = useState();
    const [formData, setFormData] = useState({
        label: "",
        description: ""
    });

    useEffect(() => {
        setId(JSON.parse(session!)?.user_id)
    }, []);

    const handleEntry = (key: string, value: string) => {
        setFormData({...formData, [key]: value})
    }

    const handleSubmit = async () => {
        const { data, error } = await supabase.from('todolist').insert({...formData, user_id: id});
    if (error) return;
        return router.replace('/')
    }

    return (
        <YStack fullscreen backgroundColor="$background" padding="$4" gap="$4">
            <FormInput placeholder={"Le titre de ma todolist"}
                       label={"Titre"}
                       value={formData.label}
                       onChange={(e) => handleEntry('label', e)}

            />

            <FormInput label={"Description"}
                       value={formData.description}
                       onChange={(e) => handleEntry('description', e)}
                       placeholder={"Une description"}
            />
            <Button onPress={() => handleSubmit()}>
                {
                    isLoading ?
                        <Spinner />
                        :
                        'Créer ma todolist'
                }

            </Button>
        </YStack>
    )
}