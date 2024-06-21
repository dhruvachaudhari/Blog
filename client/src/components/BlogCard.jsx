import React from 'react'
import { Link } from 'react-router-dom';
import ReactLinesEllipsis from 'react-lines-ellipsis';


// const BlogCard = ({ post }) => {

//     return (
//         <div className='font-noto flex flex-col '>

//             <div className='group relative w-[400px] border  border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[400px] transition-all'>
//                 <Link to={`/post/:${post.idpost}`}>
//                     <img
//                         src={post.img}
//                         alt='post cover'
//                         className='h-[230px] w-full p-2 rounded-t object-cover group-hover:h-[200px] transition-all duration-300 z-20'
//                     />

//                     <div className='p-2 flex flex-col gap-2'>
//                         <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
//                         <span className='italic text-sm overflow-x-clip'>
//                             <ReactLinesEllipsis
//                                 text={post.desc}
//                                 maxLine={2}
//                             />
//                         </span>
//                         <div className='flex flex-row m-2 items-center space-x-3 justify-start text-sm'>
//                             <p>{post.author}</p>
//                             <p>{post.date}</p>
//                         </div>
//                         {/* <Link
//                         to={`/`}
//                         className='absolute bottom-0 left-0 right-0 z-10 group-hover:bottom-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
//                     >
//                         Read article
//                     </Link> */}
//                     </div>
//                 </Link>
//             </div>

//         </div>
//     );
// }



const BlogCard = ({ post }) => {
    return (
        <div className="font-noto flex flex-col m-2">
            {console.log(`./uploads/${post.img}`)}
            <div className="group relative w-full sm:w-[320px]  md:w-[400px] border border-teal-500 hover:border-2 h-[400px] sm:h-[420px] overflow-hidden rounded-lg transition-all">
                <Link to={`/post/${post.idpost}`}>
                    <img
                        src={`./uploads/${post.img}`}
                        alt="post cover"
                        className="h-[200px] sm:h-[230px] w-full p-2 rounded-t object-cover group-hover:h-[180px] sm:group-hover:h-[200px] transition-all duration-300 z-20"
                    />
                    <div className="p-2 flex flex-col gap-2">
                        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
                        <span className="italic text-sm overflow-x-clip">
                            <ReactLinesEllipsis text={post.desc} maxLine={2} />
                        </span>
                        <div className="flex flex-row m-2 items-center space-x-3 justify-start text-sm">
                            <p>{post.author}</p>
                            <p>{post.date}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard
