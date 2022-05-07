import styles from '../../../styles/Widget.module.css';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Link from 'next/link';

const Widget = ({type, students, schools}) => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<span className={styles.title}>{type}</span>
				<span className={styles.counter}>{type === 'students' && (students.length)}{type === 'schools' && (schools.length)}</span>
				{/* <span className={styles.link}>See all {type} </span> */}

				{type === 'students' ? (
					<Link href={'/students'}>
						<a>
							<span className={styles.link}>See all {type} </span>
						</a>
					</Link>
				) : (
					<Link href={'/schools'}>
						<a>
							<span className={styles.link}>See all {type} </span>
						</a>
					</Link>
				)}
			</div>
			<div className={styles.right}>
				{/* <div className={styles.percentage}>
					<KeyboardArrowUpOutlinedIcon/>
					20%
				</div> */}
				<PersonOutlineOutlinedIcon className={styles.icon}/>
			</div>
		</div>
	)
}

export default Widget;