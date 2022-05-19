import {useState, useEffect} from 'react';
import styles from '../styles/Students.module.css';
import Sidebar from '../components/Admin/Sidebar';
import DataTable from '../components/Admin/DataTable';
import {getStudents} from '../actions/userApi';

import FileSaver from "file-saver";
import {utils, write} from "xlsx";

const Students = props => {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		getStudents().then(res => {
			setStudents(res.data);
		})
	}, []);

	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToExcel = (fileName) => {
		const ws = utils.json_to_sheet(students);
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
					<h1 className={styles.userTitle}>Students</h1>
					<div className={styles.btnExport} onClick={() => exportToExcel('students')}>
						Export
					</div>
				</div>
				<DataTable title='Students'/>
			</div>
		</div>
	)
}


export const getServerSideProps = async ctx => {
	
	try {
		const myCookie = ctx.req.cookies
		console.log('admin?', JSON.parse(myCookie.user))
		const admin = JSON.parse(myCookie.user).user.admin;
		if(!admin){
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
			admin: ''
		}
	}
	
}

export default Students;