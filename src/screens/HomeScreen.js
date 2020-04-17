import React, {useState, useCallback, useEffect} from 'react'
import {
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Image,
	ActivityIndicator,
} from 'react-native'

import SafeArea from '../components/SafeArea'
import {PRIMARY} from '../themes'
import {roomsData} from '../data'
import useDebounce from '../hooks/useDebounce'
import InputTextField from '../components/InputTextField'

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
		marginTop: 16,
	},
	meetingContainer: {
		paddingHorizontal: 16,
	},
	item: {
		marginVertical: 10,
		borderRadius: 10,
	},
})

function ListItem({_id, name, createdAt, selected, onSelect}) {
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
									marginVertical: 50 / 8,

									marginRight: 50 / 8,
								}}
								source={{uri: 'https://placeimg.com/140/140/any'}}
							/>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginVertical: 50 / 8,
									marginRight: 50 / 8,
								}}
								source={{uri: 'https://placeimg.com/140/140/any'}}
							/>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginVertical: 50 / 8,
									marginRight: 50 / 8,
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
	const [filteredRoomList, setFilteredRoomList] = useState(roomsData)
	const [selected, setSelected] = useState(new Map())
	const [loading, setLoading] = useState(false)

	const [query, setQuery] = useState('')
	const debounceQuery = useDebounce(query, 300)

	const onSelect = useCallback(
		(_id) => {
			const newSelected = new Map(selected)
			newSelected.set(_id, !selected.get(_id))

			setSelected(newSelected)
		},
		[selected],
	)

	useEffect(() => {
		const lowerCaseQuery = debounceQuery.toLowerCase()
		const newRooms = roomsData.filter((room) =>
			room.name.toLowerCase().includes(lowerCaseQuery),
		)

		setFilteredRoomList(newRooms)
	}, [debounceQuery])

	const renderHeader = () => {
		return <Text style={styles.header}>Meetings</Text>
	}

	const renderFooter = () => {
		if (!loading) {
			return null
		}

		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: '#CED0CE',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ActivityIndicator animating size="large" />
			</View>
		)
	}

	const renderSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: '86%',
					// backgroundColor: '#000',
					marginLeft: '14%',
				}}
			/>
		)
	}

	return (
		<SafeArea style={styles.container}>
			<View style={{marginHorizontal: 16}}>
				<InputTextField
					placeholderText="Enter room name"
					value={query}
					onChangeText={setQuery}
					isSearch
					white
				/>
			</View>
			<FlatList
				style={styles.meetingContainer}
				data={filteredRoomList}
				renderItem={({item}) => (
					<ListItem
						{...item}
						selected={!!selected.get(item._id)}
						onSelect={onSelect}
					/>
				)}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={renderSeparator}
				ListHeaderComponent={renderHeader}
				ListFooterComponent={renderFooter}
			/>
		</SafeArea>
	)
}
