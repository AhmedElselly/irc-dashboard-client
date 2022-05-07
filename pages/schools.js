import styles from '../styles/Students.module.css';
import Sidebar from '../components/Admin/Sidebar';
import DataTable from '../components/Admin/DataTable';

const Schools = props => {
	return (
		<div className={styles.container}>
			<Sidebar/>
			<div className={styles.right}>
				<DataTable title='Schools'/>
			</div>
		</div>
	)
}

export default Schools;