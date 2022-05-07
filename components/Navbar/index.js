import { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import Link from 'next/link';
import { isAuthenticated, logout } from '../../actions/userApi';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { getUnreadMessages } from '../../actions/messageApi';

const Navbar = props => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		getUnreadMessages().then(res => {
			console.log(res.data);
			setMessages(res.data);
		});
	}, []);

	useEffect(() => {
		if(isAuthenticated()){
			setUser(isAuthenticated().user);
		}
	}, []);

	const handleLogout = () => {
		logout(() => {
			router.push('/login');
		})
	}
	console.log(user)
	return (
		<div style={{color: router.pathname === '/' ? 'white' : '#000'}} className={styles.container}>
			<div className={styles.left}>
				<Link href='/' passHref>
					<a className={styles.linkTitle}>IRCBloq</a>
				</Link>
			</div>
			{!isAuthenticated() && 
			<Fragment>
				<div className={styles.right}>
					<Link href='/devices' passHref>
						<a className={styles.link}>Courses</a>
					</Link>
					<Link href='/login' passHref>
						<a className={styles.link}>Login</a>
					</Link>
					{/* <Link href='/signup' passHref>
						<a className={styles.link}>Signup</a>
					</Link> */}
				</div>
			</Fragment>
			}

			{isAuthenticated() && !isAuthenticated().user.admin &&
			<Fragment>
				<div className={styles.right}>
					<Link href='/devices' passHref>
						<a className={styles.link}>Courses</a>
					</Link>
					<Link href='/dashboard' passHref>
						<a className={styles.link}>Dashboard</a>
					</Link>
					<span onClick={handleLogout} className={styles.link}>
						Logout
					</span>
				</div>
			</Fragment>
			}
			{isAuthenticated() && isAuthenticated().user.admin && (
				<Fragment>
					<div className={styles.right}>
						{/* <div className={styles.item}>
							<DarkModeOutlinedIcon className={styles.icon}/>
						</div> */}
						{/* <div className={styles.item}>
							<NotificationsOutlinedIcon className={styles.icon}/>
							<div className={styles.counter}>1</div>
						</div> */}
						<div className={styles.item}>
							<Link href='/messages'>
								<a>
								<MessageOutlinedIcon className={styles.icon}/>
								{messages.length > 0 && <div className={styles.counter}>{messages.length}</div>}
								</a>
							</Link>
						</div>
						<div className={styles.item}>
							<Link href='/dashboard' passHref>
								<a>
									<img className={styles.avatar} src='https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
								</a>
							</Link>
						</div>
						<span onClick={handleLogout} className={styles.link}>
						Logout
					</span>
					</div>
				</Fragment>
			)}
		</div>
	)
}

export default Navbar;