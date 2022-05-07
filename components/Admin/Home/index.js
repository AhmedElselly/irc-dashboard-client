import styles from '../../../styles/AdminHome.module.css';
import Chart from '../Chart';
import Table from '../Table';
import Sidebar from '../Sidebar';
import Widget from '../Widget';

import {getStudents, getSchools} from '../../../actions/userApi';
import { useEffect, useState } from 'react';

const AdminHome = props => {
	const [students, setStudents] = useState([]);
	const [schools, setSchools] = useState([]);
	useEffect(() => {
		getStudents().then(res => {
			console.log('students', res.data);
			setStudents(res.data);
		})
		getSchools().then(res => {
			console.log('schools', res.data);
			setSchools(res.data);
		})
	}, []);
	return (
		<div className={styles.container}>
			<Sidebar/>
			<div className={styles.right}>
				<div className={styles.widgets}>
					<Widget students={students} type='students'/>
					<Widget schools={schools} type='schools'/>
				</div>
				<div className={styles.charts}>
					{/* <Chart/> */}
					<span className={styles.userTitle}>Users</span>
					<Table/>
				</div>
			</div>
		</div>
	)
}

export default AdminHome;