import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { getDrivers } from '../api'

const RideOptionsCard = () => {

    const [driver, setDrivers] = useState([]);
    const [selected, setSelected] = useState(null);
    
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const distancePrice = (travelTimeInformation?.distance?.value * 1000) / 1000;
    const durationPrice = (travelTimeInformation?.duration?.value / 60) * 200;

    const loadDrivers = async () => {
        const response = await getDrivers();
        setDrivers(response);
    }

    useEffect(() => {
        loadDrivers();
    }, [])

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <Text style={tw`text-center py-5 text-xl`}>
                    Seleccione un viaje - {travelTimeInformation?.distance?.text}
                </Text>
            </View>

            <FlatList data={driver}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, carType, identification, name, lastName, isOccupied }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10`}>
                        <View style={tw`-ml-6 pt-12`}>
                            <Text style={tw`text-xl font-semibold`}>{carType}</Text>
                        </View>
                        <Text style={tw`text-xl pt-12`}>
                            {new Intl.NumberFormat('es-CO', {
                                style: 'currency',
                                currency: 'COP'
                            }).format(
                                (distancePrice + durationPrice + 3500)
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Elegir {selected?.name} - {selected?.carType}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})