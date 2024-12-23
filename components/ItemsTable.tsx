import BASE_URL from "../config.js";

import { useEffect, useState } from "react";
import {
	Text,
	View,
	FlatList,
	Pressable,
	TextInput,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ItemsTable({ mealTime }) {
	const [items, setItems] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [newItemName, setNewItemName] = useState("");
	const [loading, setLoading] = useState(true);

	const getMeals = async (mealTime) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${BASE_URL}/items?filter=mealTime&value=${mealTime}`
			);
			if (response.ok) {
				const data = await response.json();
				setItems(data);
			} else {
				alert("There was an error in fetching meals.");
			}
		} catch (error) {
			console.error("Error fetching meals:", error);
			alert("Unable to fetch meals. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const toggleEditMode = () => setIsEditing(!isEditing);

	const addItem = async () => {
		if (newItemName) {
			try {
				const response = await fetch(`${BASE_URL}/items`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						itemName: newItemName,
						mealTime,
					}),
				});
				if (response.ok) {
					const { savedItem } = await response.json();
					console.log(savedItem);

					setItems([...items, savedItem]);
					setNewItemName("");
				} else {
					const { err } = await response.json();
					alert(`Failed to add item: ${err}`);
				}
			} catch (error) {
				console.error("Error adding item:", error);
				alert("There was an error in adding the item. Please try again.");
			}
		}
	};

	const deleteItem = async (itemName) => {
		try {
			const response = await fetch(`${BASE_URL}/items`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itemName,
					mealTime,
				}),
			});
			if (response.ok) {
				setItems(items.filter((item) => item.itemName !== itemName));
			} else {
				const { err } = await response.json();
				alert(`Failed to delete item: ${err}`);
			}
		} catch (error) {
			console.error("Error deleting item:", error);
			alert("There was an error in deleting the item. Please try again.");
		}
	};

	useEffect(() => {
		getMeals(mealTime);
	}, [mealTime]);

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				{isEditing && (
					<View style={styles.addContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="Item Name"
								value={newItemName}
								onChangeText={(text) => setNewItemName(text)}
								style={styles.input}
							/>
							<Pressable onPress={addItem} style={styles.addButton}>
								<Ionicons name="add-circle" size={24} color="blue" />
							</Pressable>
						</View>
					</View>
				)}
				<Pressable onPress={toggleEditMode} style={styles.editButton}>
					<Ionicons
						name={isEditing ? "checkmark-circle" : "create"}
						size={24}
						color="blue"
					/>
				</Pressable>
			</View>

			{loading ? (
				<ActivityIndicator size="large" color="blue" />
			) : items.length > 0 ? (
				<FlatList
					data={items}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<View>
								<Text>{item.itemName}</Text>
								<Text>Quantity: {item.quantity}</Text>
							</View>
							{isEditing && (
								<Pressable onPress={() => deleteItem(item.itemName)}>
									<Ionicons name="trash" size={24} color="red" />
								</Pressable>
							)}
						</View>
					)}
				/>
			) : (
				<View style={styles.noItemsContainer}>
					<Text>No items currently present!</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 20,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		backgroundColor: "#e0f7e0",
		padding: 10,
		borderRadius: 8,
	},
	editButton: {
		padding: 5,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ddd",
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	addContainer: {
		flex: 1,
		marginRight: 10,
	},
	addButton: {
		marginLeft: 10,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		marginVertical: 4,
	},
	noItemsContainer: {
		alignItems: "center",
		padding: 20,
	},
});
