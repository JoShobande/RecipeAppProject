import { View, Text, TouchableOpacity } from "react-native"
import { useAuthContext } from '../../context/AuthContext';


const ProfileScreen = () =>{
    const { logOut } = useAuthContext(); 
    return(
        <View>
            <Text>
                profile
            </Text>
        </View>
    )
}

export default ProfileScreen;