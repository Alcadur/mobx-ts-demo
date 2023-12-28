import React from 'react';
import './App.css';
import { PostsList } from './Posts';
import { AddPostForm } from './AddPostForm';
import { AppStoreProvider } from './store';


function App() {

    return (
        <AppStoreProvider>
            <div className="App">
                <AddPostForm />
                <PostsList />
            </div>
        </AppStoreProvider>
    );
}

export default App;
