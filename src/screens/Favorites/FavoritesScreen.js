import { View, Text, TouchableOpacity } from "react-native"
import { useAuthContext } from '../../context/AuthContext';


const FavouritesScreen = () =>{
    const { logOut } = useAuthContext(); 
    return(
        <View>
            <Text>
                fav
            </Text>
        </View>
    )
}

export default FavouritesScreen;