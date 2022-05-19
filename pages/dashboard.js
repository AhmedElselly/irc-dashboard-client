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
			{isAuthenticated() && user && <UserDashboard user={isAuthenticated().user}/>}
		</div>
	)
}

export const getServerSideProps = async ctx => {
	
	try {
		const myCookie = ctx.req.cookies
		console.log('admin?', JSON.parse(myCookie.user))
		const user = JSON.parse(myCookie.user);
		if(!user){
			return {
				redirect: {
					destination: '/login',
					permanent: false
				}
			}
		}
	} catch(err){
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
	return {
		props: {
			user: ''
		}
	}
}

export default Dashboard;