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

export default Courses;