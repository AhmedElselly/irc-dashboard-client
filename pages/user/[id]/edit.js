import {useState, useEffect, forwardRef} from 'react';
import styles from '../../../styles/New.module.css';
import Sidebar from '../../../components/Admin/Sidebar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import {getStudent, updateUser, getUserStatuses, updateUserStatuses, isAuthenticated} from '../../../actions/userApi';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Edit = ({user}) => {
	console.log('user', user)
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [message, setMessage] = useState('');
	const [messageError, setMessageError] = useState('');
	const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

	const {vertical, horizontal} = state;

	const [values, setValues] = useState({
		email: user.email ? user.email : '',
		password: '',
		name: user.name ? user.name : '',
		gender: user.gender ? user.gender : '',
		schoolName: user.schoolName ? user.schoolName : '',
		dateOfBirth: user.dateOfBirth ? user.dateOfBirth : '',
		grade: user.grade ? user.grade : '',
		city: user.city ? user.city : '',
		image: '',
		phone: user.phone ? user.phone : '',
		nameOfParent: user.nameOfParent ? user.nameOfParent : '',
		parentEmail: user.parentEmail ? user.parentEmail : '',
		parentPhone: user.parentPhone ? user.parentPhone : '',
		address: user.address ? user.address : '',
		role: user.role ? user.role : ''
	});

	const [statuses, setStatuses] = useState([]);
	const [status, setStatus] = useState(user.status);

	const {email, password, name, gender, schoolName, dateOfBirth, grade, city, image, phone, nameOfParent, parentEmail, parentPhone, address, role} = values;

	useEffect(() => {
		getUserStatuses().then(res => {
			setStatuses(res.data);
		})
	}, []);


	const handleGenderChange = e => {
		setValues({...values, gender: e.target.value});
	}

	const handleRoleChange = e => {
		setValues({...values, role: e.target.value});
	}

	const handleStatusChange = e => {
		setStatus(e.target.value);
		console.log(status)
		const userId = isAuthenticated().user._id
		updateUserStatuses(user._id, e.target.value, userId).then(res => {
			console.log(res.data);
		})
	}

	const handleChange = e => {
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		setValues({...values, [e.target.name]: value});
	}

	const handleSubmit = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);
		formData.append('gender', gender);
		formData.append('name', name);
		formData.append('schoolName', schoolName);
		formData.append('dateOfBirth', dateOfBirth);
		formData.append('grade', grade);
		formData.append('city', city);
		formData.append('image', image);
		formData.append('phone', phone);
		formData.append('nameOfParent', nameOfParent);
		formData.append('parentEmail', parentEmail);
		formData.append('parentPhone', parentPhone);
		formData.append('address', address);
		formData.append('role', role);
		const userId = isAuthenticated().user._id
		updateUser(user._id, formData, userId).then(res => {
			console.log(res.data);
			setOpen(true);
			setMessage(res.data.message);

		}).catch(err => {
			console.log(err.response.data.error)
			setOpenError(true);
			setMessageError(err.response.data.error);
		});
	}

	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };

	return(
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.top}>
					<h1 className={styles.title}>Edit {name}</h1>
				</div>
				<div className={styles.bottom}>
					{/* <div className={styles.bottomLeft}>left</div> */}
					<div className={styles.bottomRight}>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.formContent}>
							<div className={styles.formLeft}>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='email'>Email</label>
									<input type='email' name='email' value={email} className={styles.input} onChange={handleChange} />
								</div>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='password'>Password</label>
									<input type='password' name='password' value={password} className={styles.input} onChange={handleChange} />
								</div>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='username'>Name</label>
									<input type='text' name='name' value={name} className={styles.input} onChange={handleChange} />
								</div>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='schoolName'>School Name</label>
									<input type='text' name='schoolName' value={schoolName} className={styles.input} onChange={handleChange} />
								</div>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='birth'>Date of birth</label>
									<input type='text' name='dateOfBirth' value={dateOfBirth} className={styles.input} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='grade'>Grade</label>
									<input type='text' name='grade' value={grade} className={styles.input} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='city'>City</label>
									<input type='text' name='city' value={city} className={styles.input} onChange={handleChange}/>
								</div>
							</div>
							<div className={styles.formRight}>
							<div className={styles.formGroup}>
									<label className={styles.labelFile} htmlFor='file'>
										Image: <DriveFolderUploadOutlinedIcon className={styles.icon}/>
									</label>
									<input type='file' name='image' hidden id='file' className={styles.inputFile} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='phone'>Phone</label>
									<input type='text' name='phone' value={phone} className={styles.input} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='phone'>Name of Parent</label>
									<input type='text' name='nameOfParent' value={nameOfParent} className={styles.input} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='phone'>Parent email</label>
									<input type='text' name='parentEmail' value={parentEmail} className={styles.input} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='phone'>Parent Phone</label>
									<input type='text' name='parentPhone' value={parentPhone} className={styles.input} onChange={handleChange} />
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='address'>Address</label>
									<input type='text' name='address' value={address} className={styles.input} onChange={handleChange}/>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor='address'>Status</label>
									{/* <input type='text' name='status' value={status} className={styles.input} onChange={handleChange}/> */}
									<select onChange={handleStatusChange} name='status' value={status}>
										{statuses.map(status => (
											<option value={status}>{status}</option>
										))}
									</select>
								</div>
								<FormControl>
									<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="male"
										name="gender"
										onChange={handleGenderChange}
									>
										<FormControlLabel value="male" control={<Radio />} label="Male" />
										<FormControlLabel value="female" control={<Radio />} label="Female" />
									</RadioGroup>
									</FormControl>
								<FormControl>
									<FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="student"
										name="role"
										onChange={handleRoleChange}
									>
										<FormControlLabel value="student" control={<Radio />} label="Student" />
										<FormControlLabel value="school" control={<Radio />} label="School" />
										<FormControlLabel value="admin" control={<Radio />} label="Admin" />
									</RadioGroup>
									</FormControl>
							</div>
							</div>
							<button className={styles.btn}>Update User</button>
						</form>
					</div>
				</div>
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
	const res = await getStudent(ctx.query.id);
	return{
		props: {
			user: res.data
		}
	}
}

export default Edit;