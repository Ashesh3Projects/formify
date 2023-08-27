import { useRoutes } from "raviger";
import About from "./About";
import Container from "./Container";
import Form from "./Form/Form";
import FormList from "./Form/List";
import Attempt from "./Form/Quiz/Attempts/Attempt";
import AttemptList from "./Form/Quiz/Attempts/AttemptsList";
import Quiz from "./Form/Quiz/Quiz";
import Home from "./Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { AuthProvider } from "./AuthContext";
import Logout from "./Auth/Logout";
import Profile from "./Auth/Profile";

const routes = {
	"/": () => <Home />,
	"/login": () => <Login />,
	"/register": () => <Register />,
	"/logout": () => <Logout />,
	"/about": () => <About />,
	"/forms": () => <FormList />,
	"/profile": () => <Profile />,
	"/forms/:id": ({ id }: { id: string }) => <Form formID={Number(id)} />,
	"/quiz/:id": ({ id }: { id: string }) => <Quiz formID={Number(id)} />,
	"/quiz/:id/results": ({ id }: { id: string }) => (
		<AttemptList formID={Number(id)} />
	),
	"/quiz/:id/results/:resultID": ({
		id,
		resultID,
	}: {
		id: string;
		resultID: string;
	}) => <Attempt formID={Number(id)} attemptID={Number(resultID)} />,
};

export default function AppRouter() {
	return (
		<Container>
			<AuthProvider>{useRoutes(routes)}</AuthProvider>
		</Container>
	);
}
