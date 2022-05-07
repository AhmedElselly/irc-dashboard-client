import CoursesEnhancedTable from "../components/Admin/CoursesDataTable";
import Sidebar from "../components/Admin/Sidebar";
import styles from '../styles/CoursesAdmin.module.css';

const Courses = props => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Sidebar/>
            </div>
            <div className={styles.right}>
                
                <CoursesEnhancedTable title='Courses'/>
            </div>
        </div>
    )
}

export default Courses;