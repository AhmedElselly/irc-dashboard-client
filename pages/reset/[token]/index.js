import { useState, forwardRef } from 'react';
import styles from '../../../styles/Login.module.css';
import {resetPassword} from '../../../actions/userApi';
import {create} from '../../../actions/messageApi';
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

const Reset = ({token}) => {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [notEqual, setNotEqual] = useState(false);
	const [values, setValues] = useState({
		password: '',
		confirmPassword: '',
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

  const {vertical, horizontal} = state;

	const {password, confirmPassword} = values;


	const handleChange = e => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const handleSubmit = e => {
		e.preventDefault();
        if(password !== confirmPassword){
            setMessageError('Passwords are not equal!');
			setOpenError(true)
        } else {
            resetPassword(password, token).then(res => {
                console.log(res.data);
                setLoaded(true);
                setMessage(res.data.message);
                setOpen(true);
            }).catch(err => {
                console.log(err.response.data);
                setMessageError(err.response.data.error);
                setOpenError(true)
            });
        }		
	}

	const handleOpen = async () => {
		setOpenForm(true)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpen(false);
			setOpenError(false);
		}
	
		setOpen(false);
		setOpenError(false);
	};

	
	const handleFormClose = () => {
		setOpenForm(false);
	}

	return (
		<div className={styles.container}>			
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Reset Password</h1>
				{/* Form */}
				<form onSubmit={handleSubmit}>
					{/* Email */}
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='password'>New Password</label>
						<input type='password' className={styles.input} name='password' value={password} placeholder='*******' onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='password'>Confirm New Password</label>
						<input type='password' className={styles.input} name='confirmPassword' value={confirmPassword} placeholder='*******' onChange={handleChange} />
					</div>
					{notEqual && <span></span>}
					<button className={styles.btn}>Submit</button>
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

export const getServerSideProps = async ctx => {
    console.log('token', ctx.query.token)
    return {
        props: {
            token: ctx.query.token
        }
    }
}

export default Reset;