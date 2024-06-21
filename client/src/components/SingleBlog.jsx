import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import write from "../assets/write.png";
import remove from "../assets/delete_1214428.png";
import Menu from './Menu';
import moment from "moment";
// import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Comment from './Comment';
import { Textarea, Button } from 'flowbite-react';
import axios from "axios"
import "E:/MERN Stack/9A-internship/Blog/new/Blog_Website/client/public/uploads/1717584439635-440142_black and white eagle ___ _xl-1024-v1-0.png"


function SingleBlog() {
  const [post, setPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([])

  const getComments = async () => {

    try {
      const response = await axios.get(`http://localhost:3000/api/post/${postId}/comments`)

      // const data = await response.json();
      // setComments(data);
      setComments(response.data)
      console.log(response.data)
      return response.data
    } catch (err) {
      console.log("getComments mai problem frontend ")
    }
  }

  const addComments = async () => {

    // e.preventDefault();

    const user_id = 1

    try {

      const response = await axios.post(`http://localhost:3000/api/post/${postId}/comment`, {
        user_id: user_id,
        post_id: postId,
        content: comment
      })

      console.log(response.data)

    } catch (err) {
      console.log("add comments mai issue hai  mai problem frontend ")
    }
  }

  useEffect(() => { getComments() }, [])

  // useEffect(() => { addComments() }, [])




  const dummyComments = [
    {
      _id: '1',
      userId: '2',
      content: 'This is a test comment.',
      createdAt: new Date(),
      likes: [],
      numberOfLikes: 0,
    },
    {
      _id: '2',
      userId: '3',
      content: 'Another test comment here.',
      createdAt: new Date(),
      likes: [],
      numberOfLikes: 5,
    },
    {
      _id: '3',
      userId: '4',
      content: 'Yet another insightful comment.',
      createdAt: new Date(),
      likes: ['1'],
      numberOfLikes: 3,
    },
  ];

  const onLike = (id) => console.log(`Liked comment with id ${id}`);
  const onEdit = async (comment, newContent, _id) => {
    try {
      await axios.put(`http://localhost:3000/api/post/${postId}/comment/${_id}`, {
        content: newContent
      }).then((res) => {
        console.log(`Deleted comment with id : ${_id}`);
      })

    } catch (err) {
      console.log("delete comments mai issue hai  mai problem frontend ", err)
    }
  }
  const onDelete = async (_id) => {

    try {
      await axios.delete(`http://localhost:3000/api/post/${postId}/comment/${_id}`).then((res) => {
        console.log(`Deleted comment with id : ${_id}`);
      })

    } catch (err) {
      console.log("delete comments mai issue hai  mai problem frontend ", err)
    }
  };

  const currentUser = "user1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/post/${postId}`);
        const data = await response.json();
        setPost(data);
        console.log(data);
        console.log(data.postimg);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className='flex justify-center'>
      {/* {console.log(`public/uploads/${post.postimg}`)} */}
      <div className='h-auto w-[1024px] m-15 p-5 flex flex-row justify-center gap-[50px] '>
        <div className='flex flex-col gap-[30px] flex-[5_5_0%]'>
          <img src={`/uploads/${post.postimg}`} className='w-full h-[300px] object-cover' alt="Image" onError={(e) => console.error(`Image failed to load: /uploads/${post.postimg}`)} />
          <div className='user flex items-center gap-3'>
            <img src={post.userImg} alt="userimg" className='w-[50px] h-[50px] object-cover' />
            <div className=''>
              <span>{post.username}</span>
              <p>{moment(post.date).format("MMM DD, YYYY")}</p>
            </div>
            {/* {currentUser === post.username && ( */}
            <div className='flex gap-[5px]'>
              <Link to={"/write"} state={post}>
                <img src={write} className='w-[20px] h-[20px] cursor-pointer' alt="Edit" />
              </Link>
              <img src={remove} className='w-[20px] h-[20px] cursor-pointer' alt="Delete" />
            </div>
            {/* )} */}
          </div>
          <h1 className='text-[42px] font-noto'>{post.title}</h1>
          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }} className='text-justify leading-8 font-noto'>
          </p>
          <form className='border border-black rounded-lg p-4 shadow-sm bg-white'>
            <Textarea
              className='border border-black rounded-md p-2 focus:outline-none focus:shadow-md focus:border-blue-500 transition duration-200'
              placeholder='Add a comment...'
              rows='3'
              maxLength='200'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className='flex justify-between items-center mt-3'>
              <p className='text-gray-500 text-xs'>
                {200 - comment.length} characters remaining
              </p>
              <Button
                outline
                gradientDuoTone='purpleToBlue'
                type='submit'
                onClick={addComments}
                className='px-4 py-2 text-sm text-black'
              >
                <p className=' text-black'>Submit</p>
              </Button>
            </div>
          </form>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onLike={onLike}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </div>
        <div className='flex flex-[2_2_0%]'><Menu posts={[post]} /></div>
      </div>
    </div>
  )
}

export default SingleBlog;
