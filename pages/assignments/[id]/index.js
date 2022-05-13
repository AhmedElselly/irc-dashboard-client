import { useEffect } from 'react';
import styles from '../../../styles/Assignment.module.css';
import Sidebar from '../../../components/Admin/Sidebar';
import { getPost } from '../../../actions/postApi';

import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';

const url = 'https://ircbackend.herokuapp.com';
// const url = 'http://localhost:8000';

const assignment = ({post}) => {
       

    return (
        <div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>
				<div className={styles.headerContainer}>
					<Link href={`/user/${post.user._id}`}>
                        <a>
                            <h1 className={styles.header}>Assignment of {post.user.name}</h1>
                        </a>
                    </Link>
				</div>
                <Image className={styles.image} width={200} height={200} src={`${url}/api/posts/image/${post._id}`} />
                <span>
                    Assigned At: <Moment fromNow ago>{post.createdAt}</Moment> ago
                </span>
			</div>
		</div>
    )
}

export const getServerSideProps = async ctx => {
    const res = await getPost(ctx.query.id);

    return {
        props: {
            post: res.data
        }
    }
}

export default assignment;