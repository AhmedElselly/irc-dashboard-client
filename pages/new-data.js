import {useState, forwardRef} from 'react';
import Sidebar from '../components/Admin/Sidebar';
import styles from '../styles/NewData.module.css';
// import XLSX, {read, utils} from 'xlsx';
import * as XLSX from 'xlsx/xlsx.mjs';
import { create } from '../actions/postApi';
// import Excel from 'exceljs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewData = props => {
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [message, setMessage] = useState('');
	const [messageError, setMessageError] = useState('');
	const [state, setState] = useState({
		vertical: 'top',
		horizontal: 'center',
	});
	const {vertical, horizontal} = state;

	const [fileName, setFileName] = useState(null);
	const [data, setData] = useState([{
		team: '',
		serialNumber: '',
		name: '',
		season1: {
			D: '',
			C: '',
			N: ''
		},
		season2: {
			D: '',
			C: '',
			N: ''
		},
		season3: {
			D: '',
			C: '',
			N: ''
		},
		season4: {
			D: '',
			C: '',
			N: ''
		},
		season5: {
			D: '',
			C: '',
			N: ''
		},
		season6: {
			D: '',
			C: '',
			N: '',
			T: ''
		},
		average: {
			D: '',
			C: '',
			N: '',
			T: ''
		},
		pass: false
	}]);

	const handleChange = async e => {
		const file = e.target.files[0];
		setFileName(file.name);

		const data = await file.arrayBuffer();
		const workbook = XLSX.read(data);

		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1})

		// console.log(workbook)
		console.log(jsonData[4]);
		
		let tempArr = [];

		for(let i=2; i < jsonData.length; i++){
			tempArr.push({
				name: jsonData[i][2],
				session1: {D: jsonData[i][3], C: jsonData[i][4], N: jsonData[i][5]},
				session2: {D: jsonData[i][6], C: jsonData[i][7], N: jsonData[i][8]},
				session3: {D: jsonData[i][9], C: jsonData[i][10], N: jsonData[i][11]},
				session4: {D: jsonData[i][12], C: jsonData[i][13], N: jsonData[i][14]},
				session5: {D: jsonData[i][15], C: jsonData[i][16], N: jsonData[i][16]},
				session6: {D: jsonData[i][17], C: jsonData[i][18], N: jsonData[i][19], T:  jsonData[i][20]},		
				average: {D: jsonData[i][21], C: jsonData[i][22], N: jsonData[i][23], T:  jsonData[i][24]},
				team: jsonData[i][0],
				serialNumber: jsonData[i][1]
			});
		}
		setData(tempArr);		
	}

	console.log(data);

	const handleSubmit = async e => {
		e.preventDefault();
		create(data).then(res => {
			console.log(res.data)
			setOpen(true);
			setMessage(res.data.message);
		}).catch(err => {
			console.log(err.response.data.error)
			setOpenError(true);
			setMessageError(err.response.data.error);
		})
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
				<h1>Add New Data From Excel Sheet</h1>
				<form className={styles.form} onSubmit={handleSubmit}>
					<input type='file' name='file' className={styles.input} onChange={handleChange} />
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
			admin: ''
		}
	}
	
}

export default NewData;