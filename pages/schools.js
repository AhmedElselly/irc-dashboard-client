import {useState, useEffect} from 'react';

import styles from '../styles/Students.module.css';
import Sidebar from '../components/Admin/Sidebar';
import DataTable from '../components/Admin/DataTable';
import {getSchools} from '../actions/userApi';

import FileSaver from "file-saver";
import {utils, write} from "xlsx";

const Schools = props => {
	const [schools, setSchools] = useState([]);

	useEffect(() => {
		getSchools().then(res => {
			setSchools(res.data);
		})
	}, []);

	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToExcel = (fileName) => {
		const ws = utils.json_to_sheet(schools);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<div className={styles.container}>
			<Sidebar/>
			<div className={styles.right}>
				<div className={styles.titleContainer}>
					<h1 className={styles.userTitle}>Schools</h1>
					<div className={styles.btnExport} onClick={() => exportToExcel('schools')}>
						Export
					</div>
				</div>
				<DataTable title='Schools'/>
			</div>
		</div>
	)
}

export default Schools;