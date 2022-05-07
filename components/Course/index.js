import styles from '../../styles/Course.module.css';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {isAuthenticated} from '../../actions/userApi';
import { useState, useEffect } from 'react';
import { read } from '../../actions/enrolApi';
import Snackbar from '@mui/material/Snackbar';

const url = 'http://localhost:8000/api/courses';

const Course = ({course, handleOpen, handleClose, handleOpenCourse}) => {
	const router = useRouter();
	const [showModule, setShowModule] = useState(false);
	const [userId, setUserId] = useState('');

	useEffect(() => {
		if(isAuthenticated()) {
			setUserId(isAuthenticated().user._id);
		}
	}, []);

	const handleClick = () => {
		if(!isAuthenticated()){
			console.log('not authenticated');
			router.push('/login');
		} else {
			read(course._id, userId).then(res => {
				console.log(res);
				if(res.data.message) {
					handleOpen(true, res.data.message);		
				} else {
					handleOpenCourse();
				}
			})
			
		}
	}

	return (
		<div onClick={handleClick} className={styles.container}>
			<Image layout='responsive' width={'100%'} height={'100%'} className={styles.image} src={`${url}/course/${course._id}/image`} alt={course.title}/>
			<span className={styles.title}>{course.title}</span>
			<p className={styles.desc}>{course.description}</p>
			<div className={styles.wrapper}>
				<div className={styles.innerWrapper}>
					<p className={styles.type}>Requires</p>
					<p className={styles.typeNames}>{`${course.bluetooth ? 'Bluetooth' : ''} ${course.plugin ? 'Plugin' : ''}`}</p>
				</div>
				<div className={styles.innerWrapper}>
					<p className={styles.type}>Manufactor</p>
					<p className={styles.typeNames}>{course.manufactor}</p>
				</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.innerWrapper}>
					<p className={styles.type}>Program Mode</p>
					<p className={styles.typeNames}>{`${course.bluetooth ? 'Bluetooth' : ''} ${course.plugin ? 'Plugin' : ''}`}</p>
				</div>
				<div className={styles.innerWrapper}>
					<p className={styles.type}>Programming Language</p>
					<p className={styles.typeNames}>{course.programLanguage}</p>
				</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.innerWrapper}>
					<p className={styles.learnMore}>Learn More</p>
				</div>
				<div className={styles.innerWrapper}>
					<p className={styles.help}>Help</p>
				</div>
			</div>
			
		</div>
	)
}

export default Course;