import { useEffect, useState } from 'react';
import styles from '../../../styles/Sidebar.module.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MessageIcon from '@mui/icons-material/Message';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { getUnreadMessages } from '../../../actions/messageApi';

const Sidebar = props => {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		getUnreadMessages().then(res => {
			console.log(res.data);
			setMessages(res.data);
		});
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				{/* <DashboardIcon/> */}
				<span className={styles.logo}>Admin Dashboard</span>
			</div>
			<hr className={styles.hr}/>
			<div className={styles.center}>
				<ul className={styles.items}>
				<Link href='/dashboard' passHref><a><li className={styles.link}>
						<PersonIcon className={styles.icon}/>						
						<span className={styles.text}>All Users</span>
					</li>
					</a></Link>
				<Link href='/students' passHref><a><li className={styles.link}>
						<PersonIcon className={styles.icon}/>						
						<span className={styles.text}>Students</span>
					</li>
					</a></Link>
					<Link href='/schools' passHref><a><li className={styles.link}>
						<SchoolIcon className={styles.icon}/>
						<span className={styles.text}>Schools</span>
					</li>
					</a></Link>
					<Link href='/courses' passHref><a><li className={styles.link}>
						<FormatListBulletedIcon className={styles.icon}/>
						<span className={styles.text}>Courses</span>
					</li>
					</a></Link>
					<Link href='/assignments' passHref><a><li className={styles.link}>
						<AssignmentIcon className={styles.icon}/>
						<span className={styles.text}>Assignments</span>
					</li>
					</a></Link>
					<Link href='/new-user' passHref>
						<a>
							<li className={styles.link}>
								<PersonAddIcon className={styles.icon}/>
								<span className={styles.text}>Add New User</span>
							</li>
						</a>
					</Link>
					<Link href='/new-data' passHref>
						<a>
							<li className={styles.link}>
								<AttachFileIcon className={styles.icon}/>
								<span className={styles.text}>Add New Data</span>
							</li>
						</a>
					</Link>
					<Link href='/create-course' passHref>
						<a>
							<li className={styles.link}>
								<AddIcon className={styles.icon}/>
								<span className={styles.text}>Add New Course</span>
							</li>
						</a>
					</Link>
					<Link href='/messages' passHref>
						<a>
							<li className={styles.link}>
								<MessageIcon className={styles.icon}/>
								<span className={styles.text}>Messages {messages.length > 0 && <div className={styles.sup}>{messages.length}</div>}
								</span>
							</li>
						</a>
					</Link>
				</ul>
			</div>
			{/* <div className={styles.bottom}>
				<span className={styles.text}>Colors</span>
				<div className={styles.colorOptions}>
					<div className={styles.light}></div>
					<div className={styles.dark}></div>
				</div>
			</div> */}
		</div>
	)
}

export default Sidebar;