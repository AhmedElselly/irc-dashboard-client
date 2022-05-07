import { useState, forwardRef } from 'react';
import styles from '../styles/Login.module.css';
import {authenticate, login} from '../actions/userApi';
import {create} from '../actions/messageApi';
import {useRouter} from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = props => {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [values, setValues] = useState({
		email: '',
		name: '',
		password: '',
		text: ''
	});
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [message, setMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [messageError, setMessageError] = useState('');

	const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

	const {email, password, name, text} = values;
	const {vertical, horizontal} = state;


	const handleChange = e => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const handleMessageSubmit = e => {
		e.preventDefault();
		create(email, name, text).then(res => {
			console.log(res.data);
			setMessage(res.data.message);
			setOpen(true);
		})
	}

	const handleSubmit = e => {
		e.preventDefault();

		login(email, password).then(res => {
			console.log(res.data)
			authenticate(res.data, () => {
				console.log('login success');
				setLoaded(true);
			})
		}).catch(err => {
			console.log(err.response);
			setMessageError(err.response.data.error);
			setOpenError(true)
		});
	}

	const handleOpen = async () => {
		setOpenForm(true)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  setOpen(false);
		}
	
		setOpen(false);
	};

	if(loaded){
		router.push('/dashboard');
	}

	const handleFormClose = () => {
		setOpenForm(false);
	}

	return (
		<div className={styles.container}>
				<Modal
				open={openForm}
				onClose={handleFormClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			  >
					<Box sx={style}>
						<h4>Tell us the problem</h4>
						<form onSubmit={handleMessageSubmit}>
							{/* Email */}
							<div className={styles.formGroup}>
								<label className={styles.label} htmlFor='email'>Email</label>
								<input type='email' className={styles.input} name='email' value={email} onChange={handleChange} />
							</div>
							{/* Password */}
							<div className={styles.formGroup}>
								<label className={styles.label} htmlFor='name'>Name</label>
								<input type='text' className={styles.input} name='name' value={name} onChange={handleChange} />
							</div>
							<div className={styles.formGroup}>
								<label className={styles.label} htmlFor='name'>Name</label>
								<textarea className={styles.textArea} name='text' value={text} onChange={handleChange}></textarea>
							</div>
							{/* Button */}
						
							<button className={styles.btn}>Send Message</button>
						</form>
					</Box>
			  </Modal>
			
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Login</h1>
				{/* Form */}
				<form onSubmit={handleSubmit}>
					{/* Email */}
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='email'>Email</label>
						<input type='email' className={styles.input} name='email' value={email} onChange={handleChange} />
					</div>
					{/* Password */}
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='password'>Password</label>
						<input type='password' className={styles.input} name='password' value={password} onChange={handleChange} />
					</div>
					{/* Button */}
					<div onClick={handleOpen} className={styles.trouble}>
						Having trouble logging in?
					</div>
					<button className={styles.btn}>Login</button>
				</form>
			</div>
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

export default Login;