import React, {useState, useEffect} from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default() => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        //console.log(res.data)

        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return <div className="col-sm-4 mb-3 border" 
                    style={{marginBottom: '10px', border: 'solid 1px gray'}}
                    key={post.id}>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{post.title}</h3>
                            <CommentList comments={post.comments}/>
                            <CommentCreate postId={post.id}/>
                        </div>
                    </div>
                </div>;
    })

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="row">
            {renderedPosts}
        </div>
    </div>;
};