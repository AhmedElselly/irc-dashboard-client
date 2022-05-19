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

export default CreateCourse;