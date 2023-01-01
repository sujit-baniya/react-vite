import { Helmet } from "~/packages/helmet";

export const Dashboard = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<h1 className="text-blue-400">I'm Dashboard</h1>
		</>
	);
};
export default Dashboard