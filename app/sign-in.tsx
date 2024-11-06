import {Button, Spinner, View, YStack} from "tamagui";
import {useState} from "react";
import {supabase} from "../utils/database";
import {Link, router} from "expo-router";
import {z} from "zod";
import FormInput from "../components/FormInput";
import {useSession} from "../ctx";

export default function SignIn() {
    const { signIn } = useSession()
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
        const {error: zError} = credentialSchema.safeParse(formData);

        if(zError) {
            const errorFormat = {};
            zError.errors.forEach(tError => {
                errorFormat[tError.path[0]] = tError.message
            })
            setZodError(errorFormat);
            setIsLoading(false);
            return;
        }

        const {data, error} = await supabase.auth.signInWithPassword(formData);
        setIsLoading(false);
        if(error) {
            console.log(error);
            return;
        }

        signIn(JSON.stringify({
            token: data.session?.access_token,
            user_id: data.user?.id
        }));
        return router.replace("/");
    }

    return (
        <YStack fullscreen paddingHorizontal="$4" backgroundColor="$background">
            <YStack width="100%" gap="$4">
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
                            'Se connecter'
                    }

                </Button>
                <View width="100%" alignItems="center" display="flex">
                    <Link href="/sign-up">Je n'ai pas de compte</Link>
                </View>


            </YStack>
        </YStack>
    )
}