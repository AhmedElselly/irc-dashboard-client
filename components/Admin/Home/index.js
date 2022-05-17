import styles from '../../../styles/AdminHome.module.css';
import Chart from '../Chart';
import DataTable from '../DataTable';
import Sidebar from '../Sidebar';
import Widget from '../Widget';

import FileSaver from "file-saver";
import {utils, write} from "xlsx";

import {getStudents, getSchools, getUsers} from '../../../actions/userApi';
import { useEffect, useState } from 'react';

const AdminHome = props => {
	const [users, setUsers] = useState([]);
	const [students, setStudents] = useState([]);
	const [schools, setSchools] = useState([]);
	useEffect(() => {
		getUsers().then(res => {
			console.log(res.data)
			setUsers(res.data);
		})
		getStudents().then(res => {
			setStudents(res.data);
		})
		getSchools().then(res => {
			setSchools(res.data);
		})
	}, []);
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToExcel = (fileName) => {
		const ws = utils.json_to_sheet(users);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};
	return (
		<div className={styles.container}>
			<Sidebar/>
			<div className={styles.right}>
				<div className={styles.widgets}>
					<Widget students={students} type='students'/>
					<Widget schools={schools} type='schools'/>
				</div>
				<div className={styles.charts}>
					<div className={styles.titleContainer}>
						<h1 className={styles.userTitle}>Users</h1>
						<div className={styles.btnExport} onClick={() => exportToExcel('users')}>
							Export
						</div>
					</div>
					<DataTable title='Users'/>
				</div>
			</div>
		</div>
	)
}

export default AdminHome;