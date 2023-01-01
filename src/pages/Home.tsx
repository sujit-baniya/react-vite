import { Helmet } from "~/packages/helmet";

export const Home = () => {
	return (
		<>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<h1 className="text-red-400">I'm home</h1>
		</>
	);
};
export default Home