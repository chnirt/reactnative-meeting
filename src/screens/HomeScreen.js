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
import useDebounce from '../hooks/useDebounce'
import InputTextField from '../components/InputTextField'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: 0,
		paddingBottom: 0,
	},
	search: {
		marginBottom: 16,
		shadowColor: '#000000',
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

function ListItem({_id, name, avatar, createdAt, selected, onSelect}) {
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
								source={{uri: avatar}}
							/>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginVertical: 50 / 8,
									marginRight: 50 / 8,
								}}
								source={{uri: avatar}}
							/>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 50 / 2,
									marginVertical: 50 / 8,
									marginRight: 50 / 8,
								}}
								source={{uri: avatar}}
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
	const [filteredRoomList, setFilteredRoomList] = useState([])
	const [selected, setSelected] = useState(new Map())
	const [refresh, setRefresh] = useState(false)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)

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
		fetchRooms(page)
	}, [page])

	function fetchRooms(number) {
		const userApi = `https://5b5cb0546a725000148a67ab.mockapi.io/api/v1/users?page=${number}&limit=8`
		setLoading(true)
		fetch(userApi)
			.then((response) => response.json())
			.then((json) => {
				console.log('😂😂😂😂😂😂', json)
				const newJson = json.map((item) => ({
					_id: item.id,
					name: item.name,
					avatar: item.avatar,
					createdAt: item.createdAt,
				}))
				setLoading(false)
				setRefresh(false)
				setFilteredRoomList(
					number === 1 ? newJson : filteredRoomList.concat(newJson),
				)
			})
	}

	function refreshRooms() {
		if (page > 1) {
			setRefresh(true)
			setPage(1)
		}
	}

	function loadRooms() {
		console.log('LOADMORE-----')

		if (!loading && page < 2) {
			console.log('LOADMORE')

			setPage(page + 1)
			console.log(loading, refresh, page)
		}
	}

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
					backgroundColor: '#CED0CE',
					// marginLeft: '14%',
				}}
			/>
		)
	}

	return (
		<SafeArea style={styles.container}>
			<View style={{marginHorizontal: 16}}>
				<InputTextField
					style={styles.search}
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
				refreshing={refresh}
				onRefresh={refreshRooms}
				onEndReachedThreshold={0.5}
				onEndReached={() => loadRooms()}
			/>
		</SafeArea>
	)
}
