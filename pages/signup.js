import { useState } from 'react';
import styles from '../styles/Login.module.css';
import {authenticate, login, signup} from '../actions/userApi';
import {useRouter} from 'next/router';

const Signup = props => {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [values, setValues] = useState({
		email: '',
		name: '',
		password: ''
	});

	const {email, name, password} = values;

	const handleChange = e => {
		setValues({...values, [e.target.name]: e.target.value});
	}

	const handleSubmit = e => {
		e.preventDefault();

		signup(email, name, password).then(res => {
			console.log(res.data)
			
		});
	}

	if(loaded){
		router.push('/');
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Signup</h1>
				{/* Form */}
				<form onSubmit={handleSubmit}>
					{/* Email */}
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='email'>Email</label>
						<input type='email' className={styles.input} name='email' value={email} onChange={handleChange} />
					</div>
					{/* Username */}
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='username'>Name</label>
						<input type='text' className={styles.input} name='name' value={name} onChange={handleChange} />
					</div>
					{/* Password */}
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor='password'>Password</label>
						<input type='password' className={styles.input} name='password' value={password} onChange={handleChange} />
					</div>
					{/* Button */}
					<button className={styles.btn}>Signup</button>
				</form>
			</div>
		</div>
	)
}

export default Signup;