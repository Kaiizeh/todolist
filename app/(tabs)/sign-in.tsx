import {Button, Input, Label, YStack} from "tamagui";
import {useState} from "react";
import {supabase} from "../../utils/database";

export default function SignIn() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const handleEmailChange = (value: string) => {
        setEmail(value);
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    }

    const handleSubmit = async () => {
        if(!email || !password) return;
        const { user, error } = await supabase.auth.signInWithPassword({email, password});
        if(error) {
            console.log(error);
        } else console.log(user);
    }

    return (
        <YStack fullscreen paddingHorizontal="$4" backgroundColor="$background">
            <YStack width="100%">
                <YStack>
                    <Label>Email</Label>
                    <Input
                        value={email}
                        onChangeText={(e) => handleEmailChange(e)}
                        keyboardType="email-address"
                    />
                </YStack>
                <YStack>
                    <Label>Mot de passe</Label>
                    <Input
                        value={password}
                        onChangeText={(e) => handlePasswordChange(e)}
                        secureTextEntry
                    />
                </YStack>
                <Button mt="$3" onPress={handleSubmit}>
                    Créer mon compte
                </Button>
            </YStack>
        </YStack>
    )
}