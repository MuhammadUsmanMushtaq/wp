import { useEffect, useState } from 'react';
import axios from 'axios';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:10003/wp-json/wp/v2/posts') // Update with your WP API URL
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className='text-center mt-10'>Loading posts...</p>;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-4xl font-bold mb-8 text-center'>WordPress Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className='mb-8 p-4 border rounded shadow hover:shadow-lg transition'
        >
          <h2
            className='text-2xl font-semibold mb-2'
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className='text-gray-700'
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
          <div className='flex gap-4'>
            <div dangerouslySetInnerHTML={{ __html: post.id }} />
            <div dangerouslySetInnerHTML={{ __html: post.date }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllPosts;
