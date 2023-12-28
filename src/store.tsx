import { createContext, ReactNode } from 'react';
import { useLocalStore } from 'mobx-react';

/**
 * store types
 */
export type Post = {
    id?: number,
    title: string,
    body: string
}

export type AppStore = {
    get numberOfPosts(): number,
    posts: Post[],
    setPosts: (posts: Post[]) => void,
    addOnTop: (post: Post) => void,
    updatePost: (post: Post) => void
}

/**
 * Store context definition
 */
export const AppStoreContext = createContext<AppStore>({
    get numberOfPosts() {
        return 0;
    },
    posts: [],
    setPosts: (posts: Post[]) => {
    },
    addOnTop: (post: Post) => {
    },
    updatePost: (post: Post) => {}
});

/**
 * Store provider
 */
export const AppStoreProvider = ({ children }: { children: ReactNode }) => {

    /**
     * Actual store definition can be also done directly in <App /> component
     */
    const appStore = useLocalStore<AppStore>(() => ({
        posts: [],
        get numberOfPosts(): number {
            return appStore.posts.length;
        },
        setPosts(posts) {
            this.posts = posts;
        },
        addOnTop(post) {
            this.posts.unshift({ id: Date.now(), ...post });
        },
        updatePost({ id, title, body }) {
            const post = this.posts.find(({ id: postId }) => postId === id)!;
            post.title = title;
            post.body = body;
        }
    }));

    return (<AppStoreContext.Provider value={appStore}>{children}</AppStoreContext.Provider>);
};


