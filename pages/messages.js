import Sidebar from '../components/Admin/Sidebar';
import Message from '../components/Admin/Message';
import styles from '../styles/Messages.module.css';
import {index} from '../actions/messageApi';


const Messages = ({messages}) => {
	
	const generateMessages = () => {
		return messages?.map(message => (
			<Message message={message} ifRead={message.read}/>
		));
	}

	return(
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>			
			<div className={styles.right}>
				<div className={styles.top}>
					<h1 className={styles.title}>Messages</h1>
				</div>				
				{generateMessages()}				
			</div>			
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const res = await index();
	return {
		props: {
			messages: res.data
		}
	}
}

export default Messages;