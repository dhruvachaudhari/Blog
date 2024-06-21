// import React, { useState } from "react";
// import { Editor } from '@tinymce/tinymce-react'
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import moment from "moment";

// function Write() {
//     const state = useLocation().state;
//     const [value, setValue] = useState(state?.title || "");
//     const [title, setTitle] = useState(state?.desc || "");
//     const [file, setFile] = useState([null]);
//     const [cat, setCat] = useState(state?.cat || "");
//     const navigate = useNavigate()

//     const handleEditorChange = (e) => {
//         console.log('Content was updated:', e.target.getContent());
//     }


//     const upload = async () => {
//         try {
//             const formData = new FormData();
//             formData.append("file", file);
//             const res = await axios.post("http://localhost:3000/api/upload", formData);
//             return res.data;
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleClick = async (e) => {
//         e.preventDefault();
//         const imgUrl = file ? await upload() : '';

//         try {
//             state
//                 ? await axios.put(`/posts/${state.id}`, {
//                     title,
//                     cat: cat,
//                     desc: value,
//                     img: file ? imgUrl : "",
//                 })
//                 : await axios.post(`http://localhost:3000/api/write`, {
//                     title,
//                     cat,
//                     desc: value,
//                     img: file ? imgUrl : "",
//                     date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//                 });
//             navigate("/posts")
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div className=" font-noto mt-5 flex flex-col lg:flex-row gap-5 m-5 lg:m-20 p-5 lg:p-10">

//             <div className="flex-[5] flex flex-col gap-5 ">
//                 <h1 className="text-[30px] ">Write Your Blog</h1>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="p-2.5 border-b-2 border-black outline-none focus:border focus:border-gray-500 animate-pulse hover:animate-none "
//                 />
//                 <div className=" h-96 overflow-scroll border border-gray-700">
//                     <ReactQuill
//                         className="h-full border-none"
//                         theme="snow"
//                         value={value}
//                         onChange={setValue}
//                     />

//                 </div>
//             </div>
//             <div className="flex-[2] flex flex-col gap-5 lg:gap-5">
//                 <div className="border border-gray-700 p-2.5  flex flex-col gap-5 lg:gap-5 justify-between text-m text-gray-700">
//                     <h1 className="text-lg">Publish</h1>
//                     <span>
//                         <b>Status: </b> Draft
//                     </span>
//                     <span>
//                         <b>Visibility: </b> Public
//                     </span>
//                     <input
//                         // style={{ display: "none" }}
//                         type="file"
//                         id="file"
//                         name=""
//                         onChange={(e) => setFile(e.target.files[0])}
//                     />
//                     <label className="underline cursor-pointer" htmlFor="file">
//                         Upload Image
//                     </label>
//                     <div className="flex justify-between">
//                         <button className="cursor-pointer text-teal-500 bg-white border border-teal-500 p-1">
//                             Save as a draft
//                         </button>
//                         <button onClick={handleClick} className="cursor-pointer text-white bg-teal-500 border border-teal-500 p-1">
//                             Publish
//                         </button>
//                     </div>
//                 </div>
//                 <div className="border border-gray-700 p-2.5  flex flex-col lg:gap-5  text-xs text-gray-700">
//                     <h1 className="text-lg">Category</h1>

//                     <select
//                         className="border border-gray-300 p-2 rounded"
//                         value={cat}
//                         onChange={(e) => setCat(e.target.value)}
//                     >
//                         <option value="art">Art</option>
//                         <option value="science">Science</option>
//                         <option value="technology">Technology</option>
//                         <option value="cinema">Cinema</option>
//                         <option value="design">Design</option>
//                         <option value="food">Food</option>
//                     </select>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Write

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

function Write() {
    const location = useLocation();
    const state = location.state;
    const [title, setTitle] = useState(state?.title || "");
    const [value, setValue] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (state) {
            setTitle(state.title);
            setValue(state.desc);
            setCat(state.cat);
        }
    }, [state]);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("http://localhost:3000/api/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = file ? await upload() : state?.postimg || '';

        try {
            if (state) {
                await axios.put(`http://localhost:3000/api/post/${state.id}`, {
                    title,
                    desc: value,
                    cat,
                    img: imgUrl,
                });
            } else {
                await axios.post('http://localhost:3000/api/write', {
                    title,
                    desc: value,
                    cat,
                    img: imgUrl,
                    date: moment().format("YYYY-MM-DD HH:mm:ss"),
                });
            }
            navigate("/posts");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="font-noto mt-5 flex flex-col lg:flex-row gap-5 m-5 lg:m-20 p-5 lg:p-10">
            <div className="flex-[5] flex flex-col gap-5 ">
                <h1 className="text-[30px]">Write Your Blog</h1>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2.5 border-b-2 border-black outline-none focus:border focus:border-gray-500 animate-pulse hover:animate-none"
                />
                <div className="h-96 overflow-scroll border border-gray-700">
                    <ReactQuill
                        className="h-full border-none"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="flex-[2] flex flex-col gap-5 lg:gap-5">
                <div className="border border-gray-700 p-2.5 flex flex-col gap-5 lg:gap-5 justify-between text-m text-gray-700">
                    <h1 className="text-lg">Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="underline cursor-pointer" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="flex justify-between">
                        <button className="cursor-pointer text-teal-500 bg-white border border-teal-500 p-1">
                            Save as a draft
                        </button>
                        <button onClick={handleClick} className="cursor-pointer text-white bg-teal-500 border border-teal-500 p-1">
                            Publish
                        </button>
                    </div>
                </div>
                <div className="border border-gray-700 p-2.5 flex flex-col lg:gap-5 text-xs text-gray-700">
                    <h1 className="text-lg">Category</h1>
                    <select
                        className="border border-gray-300 p-2 rounded"
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                    >
                        <option value="art">Art</option>
                        <option value="science">Science</option>
                        <option value="technology">Technology</option>
                        <option value="cinema">Cinema</option>
                        <option value="design">Design</option>
                        <option value="food">Food</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Write;
    