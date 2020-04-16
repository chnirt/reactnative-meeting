import React from 'react'
import {
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Image,
} from 'react-native'
import {useState} from 'react'

import SafeArea from '../components/SafeArea'
import {PRIMARY, SECONDARY, THIRD, SHADOW} from '../themes'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 0,
	},
	header: {
		fontWeight: '800',
		fontSize: 32,
		color: '#514e5a',
		marginLeft: 16,
	},
	meetingContainer: {
		paddingHorizontal: 16,
	},
	item: {
		marginVertical: 10,
		borderRadius: 10,
	},
})

function Item({_id, name, createdAt, selected, onSelect}) {
	// const navigation = useNavigation()

	// function navigateChat() {
	// 	navigation?.navigate('Chat', {_id, name})
	// }
	return (
		<TouchableOpacity
			onPress={() => {
				onSelect(_id)
				// navigateChat()
			}}
			style={[styles.item, {backgroundColor: selected ? PRIMARY : '#fafafa'}]}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: 20,
				}}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: '600',
					}}>
					{name}
				</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingTop: 10,
					}}>
					<View style={{flex: 5}}>
						<Text style={{flex: 1, color: '#8c8c8c'}}>Room: {_id}</Text>
						<View style={{flex: 1, flexDirection: 'row'}}>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginHorizontal: 50 / 8,
								}}
								source={{uri: 'https://placeimg.com/140/140/any'}}
							/>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginHorizontal: 50 / 8,
								}}
								source={{uri: 'https://placeimg.com/140/140/any'}}
							/>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginHorizontal: 50 / 8,
								}}
								source={{uri: 'https://placeimg.com/140/140/any'}}
							/>
						</View>
					</View>
					<Text
						style={{
							flex: 1,
							fontSize: 16,
							fontWeight: '800',
							textAlign: 'center',
							color: PRIMARY,
						}}>
						{createdAt}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default function HomeScreen() {
	const [users, setUsers] = useState([
		{
			_id: '1',
			name: 'Meeting with S.Williams',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '2',
			name: 'Developer meeting',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '3',
			name: 'Developer meeting',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '4',
			name: 'Meeting with Dr.Strange',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '5',
			name: 'Meeting with Flash',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '6',
			name: 'Meeting with WonderWoman',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '7',
			name: 'Marvel meeting',
			createdAt: 'JAN 14 17:30',
		},
		{
			_id: '8',
			name: 'DC meeting',
			createdAt: 'JAN 14 17:30',
		},
	])
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
			<Text style={styles.header}>Meetings</Text>
			<FlatList
				style={styles.meetingContainer}
				data={users}
				renderItem={({item}) => (
					<Item
						{...item}
						selected={!!selected.get(item._id)}
						onSelect={onSelect}
					/>
				)}
				keyExtractor={(item) => item._id}
			/>
		</SafeArea>
	)
}
