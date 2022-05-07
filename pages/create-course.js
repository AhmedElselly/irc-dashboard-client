import styles from '../styles/CreateCourse.module.css';
import Sidebar from '../components/Admin/Sidebar';
import CourseForm from '../components/Admin/CourseForm';

const CreateCourse = props => {
	return(
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<CourseForm/>
			</div>
		</div>
	)
}

export default CreateCourse;