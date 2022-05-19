import Sidebar from '../../../components/Admin/Sidebar';
import styles from '../../../styles/CourseAdmin.module.css';
import {getCourse} from '../../../actions/courseApi';
import Image from 'next/image';
import Link from 'next/link';

const url = 'http://localhost:8000/api/courses';

const Course = ({course}) => {
	console.log(course)
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.titleContainer}>
					<h1>Course Information</h1>
					<Link href={`/course/${course._id}/enrol`} passHref><a>
						<div className={styles.btn}>
							Add new Enrollment
						</div>	
					</a></Link>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.wrapperLeft}>
						<h1 className={styles.title}>{course.name}</h1>
						<p className={styles.type}>Description: {course.description}</p>
						
							
							<div className={styles.type}>Manufactor: {course.manufactor}</div>
						
							<div className={styles.type}>
								Program Mode: {course.programMode.map(p => (
									<span className={styles.p}>{p}</span>
								))}
							</div>
							<div className={styles.type}>Programming Language: {course.programLanguage.map(p => (
									<span className={styles.p}>{p}</span>
								))}</div>
						<div><span className={styles.type}>Type:</span> {course.type}</div>
						<div><span className={styles.type}>Default Baud Rate:</span> {course.defaultBaudRate}</div>
						<div><span className={styles.type}>Help Link:</span> {course.helpLink}</div>
						<div><span className={styles.type}>Learn More:</span> {course.learnMore}</div>
						<div><span className={styles.type}>Featured:</span> {course.featured.toString()}</div>
						<div><span className={styles.type}>Disabled:</span> {course.disabled.toString()}</div>
						<div><span className={styles.type}>Bluetooth Requried:</span> {course.bluetoothRequired.toString()}</div>
						<div><span className={styles.type}>Serial Portal Requried:</span> {course.serialPortalRequired.toString()}</div>
						<div><span className={styles.type}>Initial Connection Required:</span> {course.initialConnectionRequired.toString()}</div>
						<div><span className={styles.type}>Launch Peripheral Connection Flow:</span> {course.launchPeripheralConnectionFlow.toString()}</div>
						<div><span className={styles.type}>Use Auto Scan:</span>{course.useAutoScan.toString()}</div>
					</div>
					<div className={styles.wrapperRight}>
						<Image width={500} height={500} className={styles.image} src={course.image.url} alt={course.title}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const res = await getCourse(ctx.query.id);
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
			course: res.data,
			admin: ''
		}
	}
}

export default Course;