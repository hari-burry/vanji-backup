import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
	AppState,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	Text,
} from "react-native";
import { Overlay } from "@/components/Overlay";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const qrLock = useRef(false);
	const appState = useRef(AppState.currentState);
	const [isLoading, setIsLoading] = useState(false);
	const [statusMessage, setStatusMessage] = useState(''); // null, "Accepted", "Order is not valid"

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === "active"
			) {
				qrLock.current = false;
			}
			appState.current = nextAppState;
		});

		return () => {
			subscription.remove();
		};
	}, []);

	const handleBarcodeScanned = async ({ data }) => {
		if (!data || qrLock.current) return;

		qrLock.current = true;
		setIsLoading(true);
		setStatusMessage('');

		try {
			const response = await fetch(`https://yourapi.com/orders/${data}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setStatusMessage("Accepted");
			} else {
				setStatusMessage("Order is not valid");
			}
		} catch (error) {
			console.error("Error during request:", error);
			setStatusMessage("Order is not valid");
		} finally {
			setIsLoading(false);
			setTimeout(() => {
				qrLock.current = false; // Allow scanning again after showing the message.
				setStatusMessage(''); // Reset message after 2 seconds.
			}, 2000);
		}
	};

	return (
		<SafeAreaView style={StyleSheet.absoluteFillObject}>
			<Stack.Screen
				options={{
					title: "Overview",
					headerShown: false,
				}}
			/>
			{Platform.OS === "android" ? <StatusBar hidden /> : null}

			<CameraView
				style={StyleSheet.absoluteFillObject}
				facing="back"
				onBarcodeScanned={handleBarcodeScanned}
			/>

			{isLoading && (
				<View style={styles.overlay}>
					<Text style={styles.text}>Processing...</Text>
				</View>
			)}

			{statusMessage && (
				<View style={styles.overlay}>
					<Text
						style={[
							styles.text,
							statusMessage === "Accepted" ? styles.success : styles.error,
						]}
					>
						{statusMessage}
					</Text>
				</View>
			)}

			<Overlay />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "bold",
	},
	success: {
		color: "limegreen",
	},
	error: {
		color: "red",
	},
});
