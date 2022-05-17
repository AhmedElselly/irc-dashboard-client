import { useEffect, useState, forwardRef } from 'react';

import styles from '../../../styles/UserDashboard.module.css';
import {getStudentPosts} from '../../../actions/postApi';
import {getStudent, changePassword, isAuthenticated} from '../../../actions/userApi';
import Chart from '../../../components/Admin/Chart';

import Image from 'next/image';
import Link from 'next/link';

import Moment from 'react-moment';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';


const url = 'https://ircbackend.herokuapp.com/api/posts/image';
// const url = 'http://localhost:8000/api/posts/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
	display: 'flex',
	flexDirection: 'column'
};


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const UserDashboard = ({user}) => {
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState('');
	const [user1, setUser1] = useState({});

	const [openDial, setOpenDial] = useState(false);
	const [open, setOpen] = useState(false);
	const [src, setSrc] = useState('');

	const [openError, setOpenError] = useState(false);
	const [messageError, setMessageError] = useState(false);
	const [message, setMessage] = useState('');
	const [messageShow, setMessageShow] = useState('');

	console.log('user', user)
	
	useEffect(() => {
		
	}, []);

	const [values, setValues] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	});

	const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state;

	const {oldPassword, newPassword, confirmPassword} = values;

	const handleChange = e => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const handleSubmit = e => {
		e.preventDefault();
		if(newPassword !== confirmPassword){
			setMessageError('Passwords do not match!');
			setOpenError(true);
		} else {
			const userId = isAuthenticated().user._id;
			changePassword(userId, oldPassword, newPassword).then(res => {
				setMessage(res.data.message);
				setOpen(true);
				setValues({
					oldPassword: '',
					newPassword: '',
					confirmPassword: ''
				})
			}).catch(err => {
				setMessageError(err.response.data.error);
				setOpenError(true)
			})
		}
		
	}

	const handleClickOpen = (src) => {
		setOpenDial(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpen(false);
			setOpenError(false);
		}
	
		setOpen(false);
		setOpenError(false);
	};

	const handleCloseDial = (reason) => {
		if(reason === 'clickaway'){
			setOpenDial(false)
		}
		setOpenDial(false)
	}
	
	useEffect(() => {
		getStudent(user._id).then(res => {
			console.log('student', res.data);
			setUser1(res.data);
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

	const generateStudents = () => {
		return user1.students?.map(student => {
			return (
				<Link href={`/user/${student._id}`} passHref>
					<a>
						<div className={styles.user}>
							{student.image && <Image className={styles.image} width={100} height={100} src={`${url}/user/image/${student._id}`} />}
							{!student.image && <Image className={styles.image} width={100} height={100} src='/user.png' />}
							<h4 className={styles.username}>{student && student.name}</h4>
						</div>
					</a>
				</Link>
			)
		})
	}
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<div className={styles.header}>
						<h1 className={styles.username}>{user.name}</h1>
						<button onClick={handleClickOpen} className={styles.submitBtn}>Reset Password</button>
					</div>
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
			{user.school && <div className={styles.studentsContainer}>
				<h1>Students</h1>
				{user.students.length > 0 ? (
					<div className={styles.studentsWrapper}>
					{generateStudents()}
					</div>): (
						<div className={styles.studentsWrapper}>
							<h3>You have no students</h3>
						</div>
				)}
				</div>}
			<h1>Assignments</h1>
				<div className={styles.assignments}>
					{generatePosts()}							
				</div>
				

			<Modal
				open={openDial}
				onClose={handleCloseDial}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<h3>Change Password</h3>
					<div className={styles.formWrapper}>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<label className={styles.label}>Old Password</label>
								<input type='password' name='oldPassword' value={oldPassword}  className={styles.input} onChange={handleChange} />
							</div>
							<div className={styles.formGroup}>
								<label>New Password</label>
								<input type='password' name='newPassword' value={newPassword} className={styles.input} onChange={handleChange} />
							</div>
							<div className={styles.formGroup}>
								<label>Confirm Password</label>
								<input type='password' name='confirmPassword' value={confirmPassword} className={styles.input} onChange={handleChange} />
							</div>
							<button className={styles.submitBtn}>Update Password</button>
						</form>
					</div>
				</Box>
			</Modal>
			<Snackbar anchorOrigin={{vertical, horizontal}} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{vertical, horizontal}} open={openError} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{messageError}
				</Alert>
			</Snackbar>
		</div>
	)
}


export const getServerSideProps = async ctx => {
	const res = await getStudent(ctx.query.id);
	const assignments = await getStudentPosts(ctx.query.id);
	// const enrols = await listByStudent(ctx.query.id);
	// console.log(enrols.data)
	return{
		props: {
			user: res.data,
			assignments: assignments.data,
			// enrollments: enrols.data
		}
	}
}

export default UserDashboard;