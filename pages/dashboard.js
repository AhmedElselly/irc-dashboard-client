import {useState, useEffect} from 'react';
import AdminHome from "../components/Admin/Home";
import UserDashboard from "../components/User/Home";
import Sidebar from "../components/Admin/Sidebar";
import {isAuthenticated} from '../actions/userApi';

const Dashboard = props => {
	const [admin, setAdmin] = useState(false);
	const [user, setUser] = useState(false);

	useEffect(() => {
		if(isAuthenticated() && isAuthenticated().user.admin){
			setAdmin(true);
		} else {
			setUser(true);
		}
	}, []);
	return (
		<div>
			{admin && <AdminHome/>}
			{user && <UserDashboard user={isAuthenticated().user}/>}
		</div>
	)
}

export default Dashboard;