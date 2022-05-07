import {useEffect, useState} from 'react';
import styles from '../../../styles/Message.module.css';
import Moment from 'react-moment';
import {updateMessage} from '../../../actions/messageApi';

const Message = ({message}) => {
	const [read, setRead] = useState(message.read);

	const handleRead = async e => {
		// handleChangeRead();
		updateMessage(message._id, !message.read).then(res => {
			console.log(res.data);
			setRead(res.data.read);
		})
	}
	return (
		<div key={message._id} className={`${styles.bottom} ${styles.message}`}>
			<h4 className={styles.email}>{message.email}</h4>
			<span className={styles.name}>{message.name}</span>				
			<span className={styles.date}>
					<Moment fromNow>{message.createdAt}</Moment>
			</span>
			<p className={styles.text}>{message.text}</p>
			<div onClick={handleRead} className={styles.readBtn}>{read && 'Mark Unread'}</div>
			<div onClick={handleRead} className={styles.readBtn}>{!read && 'Mark Read'}</div>
		</div>
	)
}

export default Message;