import styles from '../../styles/Header.module.css';
import Link from 'next/link';
import { isAuthenticated } from '../../actions/userApi';

const Header = props => {
	return (
		<div className={styles.container}>
			<video className={styles.video} autoPlay muted loop id="myVideo">
				<source src='/pexelvideo.mp4' type="video/mp4"/>
				{/* <source src='/network.mp4' type="video/mp4"/> */}
			</video>
			{isAuthenticated() ? (
				<Link href='/dashboard' passHref>
					<a className={styles.loginBtn}>Dashboard</a>
				</Link>
			) : (
				<Link href='/login' passHref>
					<a className={styles.loginBtn}>Login</a>
				</Link>
			)}
		</div>
	)
}

export default Header;