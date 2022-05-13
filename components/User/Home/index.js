import { useEffect, useState } from 'react';

import styles from '../../../styles/UserDashboard.module.css';
import {getStudentPosts} from '../../../actions/postApi';
import {getStudent} from '../../../actions/userApi';
import Chart from '../../../components/Admin/Chart';

import Image from 'next/image';
import Moment from 'react-moment';

const url = 'https://ircbackend.herokuapp.com/api/posts/image';
// const url = 'http://localhost:8000/api/posts/image';

const UserDashboard = ({user}) => {
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState('');
	useEffect(() => {
		getStudent(user._id).then(res => {
			console.log('student', res.data);
		})

		getStudentPosts(user._id).then(res => {
			console.log('students posts', res.data);
			setPosts(res.data)
		})
	}, []);
	const generatePosts = () => {
		return posts?.map(post => {
			return (
				<div className={styles.postContainer}>
					<Image width={200} height={200} src={`${url}/${post._id}`} />
					<span>
						Assigned At: <Moment fromNow ago>{post.createdAt}</Moment> ago
					</span>
				</div>
			)
		})
	}
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<h1 className={styles.username}>{user.name}</h1>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Email:</span>
						<span className={styles.itemValue}>{user.email}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Phone:</span>
						<span className={styles.itemValue}>{user.phone}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>City:</span>
						<span className={styles.itemValue}>{user.city}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Grade:</span>
						<span className={styles.itemValue}>{user.grade}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Gender:</span>
						<span className={styles.itemValue}>{user.gender}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>School name:</span>
						<span className={styles.itemValue}>{user.schoolName}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Parent name:</span>
						<span className={styles.itemValue}>{user.nameOfParent}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Parent phone:</span>
						<span className={styles.itemValue}>{user.parentPhone}</span>
					</div>
					<div className={styles.detailItem}>
						<span className={styles.itemKey}>Parent email:</span>
						<span className={styles.itemValue}>{user.email}</span>
					</div>
				</div>
				<div className={styles.right}>
					<Chart name={user.name} data={user.data}/>
				</div>				
			</div>
			<h1>Assignments</h1>
				<div className={styles.assignments}>
					{generatePosts()}
							
				</div>
		</div>
	)
}

export default UserDashboard;