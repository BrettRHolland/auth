import React, { Component } from "react";
import { View } from "react-native";
import { Header, Button, Spinner } from "./components/common";
import firebase from "firebase";
import LoginForm from "./components/LoginForm";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from 'react-native-dotenv'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: null
		};
	}
	componentWillMount() {
		firebase.initializeApp({
			apiKey: apiKey,
			authDomain: authDomain,
			databaseURL: databaseURL,
			projectId: projectId,
			storageBucket: storageBucket,
			messagingSenderId: messagingSenderId
		});

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<View style={styles.loginButtonStyle}>
						<Button onPress={() => firebase.auth().signOut()}>Log out</Button>
					</View>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

const styles = {
	loginButtonStyle: {
		flexDirection: "row"
	}
};

export default App;
