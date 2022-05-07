import styles from '../../../styles/Dashboard.module.css';

const Dashboard = props => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.top}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>Information</h1>
						{admin && <Link href={`/user/${user._id}/edit`} passHref>
							<a className={styles.link}>Edit</a>
						</Link>}
					</div>
					<div className={styles.item}>
						<img className={styles.img} src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80' />
						<div className={styles.details}>
							<h1 className={styles.username}>{user.name}</h1>
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
			</div>
		</div>
	)
}

export default Dashboard;