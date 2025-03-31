import { View, Text, TouchableOpacity } from "react-native"
import { useAuthContext } from '../../context/AuthContext';


const NotificationScreen = () =>{
    const { logOut } = useAuthContext(); 
    return(
        <View>
            <Text>
                NotificationScreen
            </Text>
            <TouchableOpacity onPress={()=>logOut()}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotificationScreen;