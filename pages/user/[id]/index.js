import { useEffect, useState, forwardRef } from 'react';
import { getStudent, isAuthenticated } from '../../../actions/userApi';
import { getStudentPosts } from '../../../actions/postApi';
import { listByStudent, removeStudentEnrol } from '../../../actions/enrolApi';
import Chart from '../../../components/Admin/Chart';
import Sidebar from '../../../components/Admin/Sidebar';
import styles from '../../../styles/User.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';

import FileSaver from "file-saver";
import {utils, write} from "xlsx";

const url = 'https://ircbackend.herokuapp.com';
// const url = 'http://localhost:8000';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
const User = ({user, assignments, enrollments}) => {
	console.log('user', user)
	const [openDial, setOpenDial] = useState(false);
	const [src, setSrc] = useState('');
	const [enrols, setEnrols] = useState(enrollments);

	const handleClickOpen = (src) => {
		setOpenDial(true);
		setSrc(src);
	};
	
	const handleCloseDial = () => {
		setOpenDial(false);
	};

	console.log('user', user)

	const [admin, setAdmin] = useState(false);
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

	useEffect(() => {
		if(isAuthenticated() && isAuthenticated().user.admin){
			setAdmin(isAuthenticated().user.admin)
		}
	}, []);

	const handleRemoveEnrol = (userId, enrolId) => {
		let newArr;
		removeStudentEnrol(userId, enrolId).then(res => {
			console.log(res.data);
			setOpen(true);
			setMessage(res.data.message);
			newArr = enrols.filter(enrol => enrol._id !== enrolId);
			setEnrols(newArr);
		})
	}

	const generateEnrollments = () => {
		return enrols?.map(enrol => {
			return (
				<div key={enrol._id} className={styles.card}>
					<div className={styles.cardWrapper}>
						<Image width={200} height={200} src={enrol.course.image.url} />
						<button onClick={() => handleRemoveEnrol(enrol.student, enrol._id)} className={styles.btnRemove}>Remove Enrollment</button>
					</div>
					<div>{enrol.course.name}</div>
					
				</div>
			)
		})
	}

	const generateAssignments = () => {
		return assignments?.map(post => {
			return (
				<div key={post._id} onClick={() => handleClickOpen(`${url}/api/posts/image/${post._id}`)} className={styles.postContainer}>
					<Image objectFit='contain' width={200} height={200} src={`${url}/api/posts/image/${post._id}`} />
					<b>{post.title}</b>
					<span>
						Assigned At: <Moment fromNow ago>{post.createdAt}</Moment> ago
					</span>
				</div>
			)
		})
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpen(false);
			setOpenError(false);
		}
	
		setOpen(false);
		setOpenError(false);
	};

	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToExcel = (fileName) => {
		const ws = utils.json_to_sheet([user]);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	const generateStudents = () => {
		return user.students?.map(student => {
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
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.top}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>Information</h1>
						<div className={styles.buttonsContainer}>
						{admin && <Link href={`/user/${user._id}/edit`} passHref>
							<a className={styles.link}>Edit</a>
						</Link>}
						{admin && <div className={styles.btnExport} onClick={() => exportToExcel(user.name)}>
							Export
						</div>}
						</div>
					</div>
					<div className={styles.item}>
					{user.image && <Image className={styles.img} width={100} height={100} src={`${url}/api/users/user/image/${user._id}`} />}
							{!user.image && <Image className={styles.img} width={100} height={100} src='/user.png' />}
						<div className={styles.details}>
							<h1 className={styles.username}>{user.name}</h1>
							<div className={styles.detailItem}>
								<span className={styles.itemKey}>Role:</span>
								<span className={styles.itemValue}>
									{user.school && ('School')}
									{user.student && ('Student')}
									{user.admin && ('Admin')}
								</span>
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
					</div>
				</div>
				<Chart name={user.name} data={user.data}/>
				{user.school && <div className={styles.studentsContainer}>
					<h1>Students</h1>
					{user.student.length > 0 ? (
						<div className={styles.studentsWrapper}>
						{generateStudents()}
						</div>): (
							<div className={styles.studentsWrapper}>
								<h3>You have no students</h3>
							</div>
					)}
				</div>}
				<div className={styles.assignmentsContainer}>
					<h3>Courses Enrolled</h3>
					<div className={styles.assignments}>
						{enrollments.length ? generateEnrollments(): (
							<h1>User doesn't have enrolled courses</h1>
						)}
					</div>
				</div>
				<div className={styles.assignmentsContainer}>
					<h3>Assignments</h3>
					<div className={styles.assignments}>
						{assignments.length ? generateAssignments(): (
							<h1>User doesn't have assignments</h1>
						)}
					</div>
				</div>
			</div>
			<Snackbar anchorOrigin={{vertical, horizontal}} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
			<Dialog
        open={openDial}
        onClose={handleCloseDial}
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
	const res = await getStudent(ctx.query.id);
	const assignments = await getStudentPosts(ctx.query.id);
	const enrols = await listByStudent(ctx.query.id);
	console.log(enrols.data)
	return{
		props: {
			user: res.data,
			assignments: assignments.data,
			enrollments: enrols.data
		}
	}
}

export default User;