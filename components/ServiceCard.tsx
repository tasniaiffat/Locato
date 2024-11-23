import { colors } from '@/constants/Colors';
import { View, Text, StyleSheet } from 'react-native'
const ServiceCard = ({text}:{text:string}) => (
    <View style={cardStyles.container}>
        <Text style={cardStyles.text}>{text}</Text>
    </View>
)
export default ServiceCard;


const cardStyles = StyleSheet.create({
    container: {
        width: 150,
        height: 170,
        backgroundColor: "#a0c3be",
        margin: 10,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.background,
        fontSize: 20,
        fontWeight: 'bold'
    }
})
