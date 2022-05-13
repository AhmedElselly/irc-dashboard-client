import { useEffect, useState } from 'react';
import {getPosts} from '../../actions/postApi';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Post.module.css';
import Sidebar from '../../components/Admin/Sidebar';

const url = 'https://ircbackend.herokuapp.com/api/posts'
// const url = 'http://localhost:8000/api/posts'

const Assignments = props => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		getPosts().then(res => {
			console.log(res.data);
			setPosts(res.data);
		})
	}, []);

	const generatePosts = () => {
		return posts?.map(post => {
			console.log(post._id)
			return (
				<Link href={`/assignments/${post._id}`} passHref>
					<a>
						<div className={styles.post}>
							<Image className={styles.image} width={100} height={100} src={`${url}/image/${post._id}`} />
							<h4 className={styles.username}>{post.user && post.user.name}</h4>
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