import {Input, Label, Text, YStack} from "tamagui";


export default function FormInput({label, value, errorMessage = null, onChange, ...props}) {


    return (
        <YStack>
            <Label color={errorMessage ? "red" : ""}>{label}</Label>
            <Input
                onChangeText={(e) => onChange(e)}
                borderColor={errorMessage ? "red" : "#BABABA"}
                {...props}
            />
            {
                errorMessage &&
                <Text color="red">{errorMessage}</Text>
            }
        </YStack>
    )
}