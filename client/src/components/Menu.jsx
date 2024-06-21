import React from 'react'
// import posts from './post'

const Menu = ({ posts }) => {

    return (
        <div>
            <div className="flex-2 flex flex-col gap-6 font-noto    ">
                <h1 className="text-xl font-semibold text-gray-700">Other posts you may like</h1>
                {posts.slice(0, 1).map((post, index) => (
                    <div className="flex flex-col gap-2.5" key={index}> {/* 10px gap is approximately 2.5 in Tailwind */}
                        <img
                            // src={`../upload/${post?.img}`}
                            src={`/uploads/${post.postimg}`}
                            alt=""
                            className="w-full h-52 object-cover"
                        />
                        <h2 className="text-gray-700">{post.title}</h2>
                        <button className="w-max px-4 py-2 border border-teal-500 text-teal-500 bg-white hover:border-white hover:bg-green-200  hover:text-black">
                            Read More
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Menu
