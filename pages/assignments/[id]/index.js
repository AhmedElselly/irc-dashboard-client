import { useState, useEffect } from 'react';
import styles from '../../../styles/Assignment.module.css';
import Sidebar from '../../../components/Admin/Sidebar';
import { getPost, getStudentPosts } from '../../../actions/postApi';
import { getStudent } from '../../../actions/userApi';

import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';

import Dialog from '@mui/material/Dialog';

const url = 'https://ircbackend.herokuapp.com';
// const url = 'http://localhost:8000';

const assignment = ({user, relatedAssignments}) => {
	const [open, setOpen] = useState(false);
	const [src, setSrc] = useState('');

	const handleClickOpen = (src) => {
		setOpen(true);
		setSrc(src);
	};
	
	const handleClose = () => {
		setOpen(false);
	};
			
	const generateRelated = () => {
		return relatedAssignments?.map(related => {
			return (
				<div onClick={() => handleClickOpen(`${url}/api/posts/image/${related._id}`)} className={styles.card}>
					<Image className={styles.image} width={200} height={200} src={`${url}/api/posts/image/${related._id}`} />
					{related.title && <b>{related.title}</b>}
					<span>
						Assigned At: <Moment fromNow ago>{related.createdAt}</Moment> ago
					</span>
				</div>
			)
		})
	}
	return (
		<div className={styles.container}>
			<div className={styles.left}>
					<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.bottom}>
					<h1>Assignments of {user.name}</h1>
					<div className={styles.bottomWrapper}>
					{generateRelated()}
					</div>
				</div>
			</div>
			<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
				<div className={styles.imageContainer}>
        	<Image className={styles.imageLarge} width={500} height={100} src={src} />
				</div>
      </Dialog>
		</div>
	)
}

export const getServerSideProps = async ctx => {
    const user = await getStudent(ctx.query.id);
    const related = await getStudentPosts(ctx.query.id);
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
            user: user.data,
            relatedAssignments: related.data,
			admin: ''
        }
    }
}

export default assignment;