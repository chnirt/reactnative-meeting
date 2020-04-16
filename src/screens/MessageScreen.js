import React from 'react'
import {Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import SafeArea from '../components/SafeArea'
import {SECONDARY} from '../themes'

const DATA = [
	{
		_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		name: 'Chin',
	},
	{
		_id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		name: 'Hung',
	},
	{
		_id: '58694a0f-3da1-471f-bd96-145571e29d72',
		name: 'Hieu',
	},
]

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
})

function Item({_id, name, selected, onSelect}) {
	const navigation = useNavigation()

	function navigateChat() {
		navigation?.navigate('Chat', {_id, name})
	}
	return (
		<TouchableOpacity
			onPress={() => {
				onSelect(_id)
				navigateChat()
			}}
			style={[
				styles.item,
				{backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'},
			]}>
			<Text>{name}</Text>
		</TouchableOpacity>
	)
}

export default function Message() {
	const [selected, setSelected] = React.useState(new Map())

	const onSelect = React.useCallback(
		(_id) => {
			const newSelected = new Map(selected)
			newSelected.set(_id, !selected.get(_id))

			setSelected(newSelected)
		},
		[selected],
	)

	return (
		<SafeArea style={styles.container}>
			<Text>Message</Text>
			<FlatList
				data={DATA}
				renderItem={({item}) => (
					<Item
						_id={item._id}
						name={item.name}
						selected={!!selected.get(item.id)}
						onSelect={onSelect}
					/>
				)}
				keyExtractor={(item) => item._id}
			/>
		</SafeArea>
	)
}
