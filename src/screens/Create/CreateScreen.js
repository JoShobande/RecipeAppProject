import { View, Text, TouchableOpacity } from "react-native"
import { useAuthContext } from '../../context/AuthContext';


const CreateScreen = () =>{
    const { logOut } = useAuthContext(); 
    return(
        <View>
            <Text>
                create
            </Text>
            <TouchableOpacity onPress={()=>logOut()}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateScreen;