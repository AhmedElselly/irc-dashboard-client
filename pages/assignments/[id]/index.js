import { useEffect } from 'react';
import styles from '../../../styles/Assignment.module.css';
import Sidebar from '../../../components/Admin/Sidebar';
import { getPost, getStudentPosts } from '../../../actions/postApi';

import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';

const url = 'https://ircbackend.herokuapp.com';
// const url = 'http://localhost:8000';

const assignment = ({post, relatedAssignments}) => {
       
    const generateRelated = () => {
        return relatedAssignments?.map(related => {
            return (
                <div className={styles.card}>
                    <Image className={styles.image} width={200} height={200} src={`${url}/api/posts/image/${related._id}`} />
                    <span>
                        Assigned At: <Moment fromNow ago>{related.createdAt}</Moment> ago
                    </span>
                </div>
            )
        })
    }
    return (
        <div className={styles.container}>
                <div className={styles.left}>
                    <Sidebar/>
                </div>
                <div className={styles.right}>
                <div className={styles.wrapper}>
                    <div className={styles.card}>
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
                <div className={styles.bottom}>
                    <h1>Other Assignments of {post.user.name}</h1>
                    <div className={styles.bottomWrapper}>
                    {generateRelated()}
                    </div>
                </div>
            </div>
            
		</div>
    )
}

export const getServerSideProps = async ctx => {
    const res = await getPost(ctx.query.id);
    const related = await getStudentPosts(res.data.user._id);
    return {
        props: {
            post: res.data,
            relatedAssignments: related.data
        }
    }
}

export default assignment;