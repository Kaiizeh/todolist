import {Button, Spinner, View, XStack, YStack} from "tamagui";
import {useState} from "react";
import {supabase} from "../utils/database";
import { z } from "zod";
import FormInput from "../components/FormInput";
import {Link, router} from "expo-router";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [zodError, setZodError] = useState({});

    const credentialSchema = z.object({
        email: z.string().email("Adresse mail non valide"),
        password: z.string().min(6, "Le mot de passe doit contenir 6 minimum").max(16, "Le mot de passe doit contenir 16 maximum")
    })

    const handleEntry = (key: string, value: string) => {
        setFormData({...formData, [key]: value})
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const {success, error: zError} = credentialSchema.safeParse(formData);

        if(zError) {
            const errorFormat = {};
            zError.errors.forEach(tError => {
                    errorFormat[tError.path[0]] = tError.message
                })
            setZodError(errorFormat);
            setIsLoading(false);
           return;
        }

        const {data, error} = await supabase.auth.signUp(formData);
        setIsLoading(false);

        if(error) {
            console.log(error);
            return;
        }
        return router.replace("/sign-in");
    }

    return (
        <YStack fullscreen backgroundColor="$background" padding="$4" gap="$4">
                <FormInput placeholder={"email..."}
                    label={"Adresse mail"}
                           value={formData.email}
                           onChange={(e) => handleEntry('email', e)}
                           errorMessage={zodError?.email}

                />

                <FormInput label={"Mot de passe"}
                           value={formData.password}
                           onChange={(e) => handleEntry('password', e)}
                           errorMessage={zodError?.password}
                           placeholder={"Mot de passe"}
                           secureTextEntry
                />

                <Button onPress={() => handleSubmit()}>
                    {
                        isLoading ?
                            <Spinner />
                            :
                            'Créer mon compte'
                    }

                </Button>
            <View width="100%" alignItems="center" display="flex">
                <Link href="/sign-in">J'ai deja un compte</Link>
            </View>
        </YStack>
    )
}