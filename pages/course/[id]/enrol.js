import styles from '../../../styles/Enrol.module.css';
import Sidebar from '../../../components/Admin/Sidebar';
import {getCourse} from '../../../actions/courseApi';
import { useState } from 'react';
import { getStudents, isAuthenticated } from '../../../actions/userApi';
import {create} from '../../../actions/enrolApi';
import Snackbar from '@mui/material/Snackbar';


const Enrol = ({course}) => {
	const [email, setEmail] = useState('');
	// const [state, setState] = useState({
  //   open: false,
  //   vertical: 'bottom',
  //   horizontal: 'left',
  // });
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');

	
	const handleChange = e => {
		setEmail(e.target.value);
	}
	
	const handleSubmit = e => {
		e.preventDefault();
		const userId = isAuthenticated().user._id;
		create(course._id, userId, email).then(res => {
			console.log(res.data);
			if(res.data) {
				setMessage('User successfully enrolled');
			}
			
			setOpen(true);
		}).catch(err => {
			console.log(err.response);
			setMessage(err.response.data.error);
			setOpen(true)
		});
	}

	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
    }

    setOpen(false);
  };

	console.log(course)
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>Create an Enrollment</h1>
				</div>
					<form className={styles.wrapper} onSubmit={handleSubmit}>
						<label className={styles.label}>Enter User Email:</label>
						<input className={styles.input} type='email' name='email'  value={email} onChange={handleChange} />
						<button className={styles.btn}>Submit</button>
					</form>
			</div>
			<Snackbar
				autoHideDuration={6000}
				open={open}
				onClose={handleClose}
				message={message}
			/>
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

export default Enrol;