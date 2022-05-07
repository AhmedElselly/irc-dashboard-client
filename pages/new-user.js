import {useState, forwardRef} from 'react';
import styles from '../styles/New.module.css';
import Sidebar from '../components/Admin/Sidebar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import {addNewUser, isAuthenticated} from '../actions/userApi';
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

const New = props => {
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
		email: '',
		password: '',
		name: '',
		gender: '',
		schoolName: '',
		dateOfBirth: '',
		grade: '',
		city: '',
		image: '',
		phone: '',
		nameOfParent: '',
		parentEmail: '',
		parentPhone: '',
		address: '',
		role: ''
	});

	const {email, password, name, gender, schoolName, dateOfBirth, grade, city, image, phone, nameOfParent, parentEmail, parentPhone, address, role} = values;

	const handleChange = e => {
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		setValues({...values, [e.target.name]: value});
	}

	const handleGenderChange = e => {
		setValues({...values, gender: e.target.value});
	}

	const handleRoleChange = e => {
		setValues({...values, role: e.target.value});
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

		console.log(values)
		const userId = isAuthenticated().user._id;
		addNewUser(formData, userId).then(res => {
			console.log(res.data);
			
			setOpen(true);
			setMessage(res.data.message);
			
		}).catch(err => {
			console.log(err.response.data.error)
			setOpenError(true);
			setMessageError(err.response.data.error);
		});
	}

	const handleClick = () => {
    setOpen(true);
  };

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
					<h1 className={styles.title}>Add New User</h1>
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
								{/* <div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='gender'>Gender</label>
									<input type='text' name='gender' value={gender} className={styles.input} onChange={handleChange} />
								</div> */}
								
								<div className={styles.formGroup}>
									<label className={`${styles.label} ${styles.required}`} htmlFor='schoolName'>School name the user belongs</label>
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
									<span>{image && image.name}</span>
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
							<button className={styles.btn}>Add new user</button>
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

export default New;