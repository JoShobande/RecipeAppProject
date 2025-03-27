import { View, Text, TouchableOpacity } from "react-native"
import { useAuthContext } from '../../context/AuthContext';


const Home = () =>{
    const { logOut } = useAuthContext(); 
    return(
        <View>
            <Text>
                home
            </Text>
            <TouchableOpacity onPress={()=>logOut()}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;