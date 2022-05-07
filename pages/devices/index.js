import {useState} from 'react';
import { index } from '../../actions/courseApi';
import styles from '../../styles/Devices.module.css';
import Course from '../../components/Course';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useRouter} from 'next/router';

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

const Devices = ({courses}) => {
	const router = useRouter();
	const [showModule, setShowModule] = useState(false);
	const [message, setMessage] = useState('');

	const handleOpen = (bool, message) => {
		setShowModule(bool);
		setMessage(message);
	}

	const handleClose = (bool) => {
		setShowModule(false);
	}

	const handleOpenCourse = () => {
		router.push('/');
	}

	const generateCourses = () => {
		return courses?.map(course => {
			return <Course handleOpen={handleOpen} handleClose={handleClose} handleOpenCourse={handleOpenCourse} course={course}/>
		})
	}
	

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{generateCourses()}
			</div>

			<Modal
				open={showModule}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Alert
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{message}
					</Typography>
				</Box>
			</Modal>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const res = await index();
	return {
		props: {
			courses: res.data
		}
	}
}

export default Devices;