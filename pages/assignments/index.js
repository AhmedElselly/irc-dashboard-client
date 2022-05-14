import { useEffect, useState } from 'react';
import {getPosts} from '../../actions/postApi';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Post.module.css';
import Sidebar from '../../components/Admin/Sidebar';

const url = 'https://ircbackend.herokuapp.com/api/users'
// const url = 'http://localhost:8000/api/users'

const Assignments = props => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getPosts().then(res => {
			console.log(res.data);
			setUsers(res.data);
		})
	}, []);

	const generatePosts = () => {
		return users?.map(user => {
			console.log(user._id)
			return (
				<Link href={`/assignments/${user._id}`} passHref>
					<a>
						<div className={styles.user}>
							{user.image && <Image className={styles.image} width={100} height={100} src={`${url}/user/image/${user._id}`} />}
							{!user.image && <Image className={styles.image} width={100} height={100} src='/user.png' />}
							<h4 className={styles.username}>{user && user.name}</h4>
						</div>
					</a>
				</Link>
			)
		})
	}
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>Assignments</h1>
				</div>
				<div className={styles.wrapper}>
					{generatePosts()}
				</div>
			</div>
		</div>
	)
}

export default Assignments;