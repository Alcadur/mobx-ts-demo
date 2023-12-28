import { AppStoreContext, Post } from './store';
import styles from "./posts.module.css";
import { useObserver } from 'mobx-react';
import { useContext, useState } from 'react';
import { PostDetails } from './PostDetails';

export const useLoadPostsToStore = () => {
    const [isLoading, setIsLoading] = useState(false);
    const store = useContext(AppStoreContext);

    async function fetchData() {
        setIsLoading(true);
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postJSON: Post[] = await postsResponse.json();
        setIsLoading(false);

        store.setPosts(postJSON);
    }

    if (!store.numberOfPosts && !isLoading) {
        fetchData();
    }
};

export const PostsList = () => {
    useLoadPostsToStore();
    const store = useContext(AppStoreContext);

    return useObserver(() =>
        <section>
            <h3>We have {store.numberOfPosts} posts in total</h3>

            <ul className={styles.itemsList}>
                {store.posts.map(post => <PostDetails key={post.id} post={post} />)}
            </ul>
        </section>
    );
};
