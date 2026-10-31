
import { useContext, useId, useRef, useState } from "react";
import {
  FaImage,
  FaGlobe,
  FaChevronDown,
  FaFaceSmile,
} from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

import { AuthContext } from "../../Context/AuthContext";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react";

export interface CreatePostProps {
  postId?: string;
  postBody?: string;
  postImage?: string;
  onClose?: () => void;
  statues?: "share" | "edit" | "create";
}

export default function CreatePost({postId,postBody ,postImage ,onClose,statues}:CreatePostProps) {
  const imageInputId = useId();
  const [content, setContent] = useState(postBody??"");
  const imageContent =useRef<HTMLInputElement>(null)
  const {data,token} =useContext(AuthContext)
  const [showEmoji, setShowEmoji] = useState(false);
   let [imageURL,setImageURL]=useState(postImage??"");
   const queryClient=useQueryClient()
   
   
   let {mutate  }=useMutation({
    mutationFn: handlePost,
    mutationKey:['createpost'],
    onSuccess:function(){
      postId ? toast.success('Post update Sucessfuly') 
      :toast.success('Post added Sucessfuly') 
      setContent("");
    setImageURL("")
      onClose?.();
    queryClient.invalidateQueries({queryKey:['posts']})    },
      onError:function (){toast.danger("failed")
      
      }
   })

  function handlePost() {
    const file = imageContent.current?.files?.[0];

if (!content.trim() && !file) {
  return Promise.reject(new Error("Post content or image is required"));
}
    console.log({ content });
    console.log(imageContent.current?.files?.[0]);
    let formData=new FormData()
    formData.append("body",content)


  if (file) {
    formData.append("image", file);
  }
    
    
   if(postId)  return axios.put(`https://route-posts.routemisr.com/posts/${postId}`,
      formData,{
        headers:{token}
      }
    )
      return axios.post('https://route-posts.routemisr.com/posts',
      formData,{
        headers:{token}
      }
    )
  }
  
  function PreviewImage(){
    setImageURL("")
  const file = imageContent.current?.files?.[0];

  if (file) {
    setImageURL(URL.createObjectURL(file));
  }    console.log(imageURL);
    
  }
  console.log(postBody+" create post");


  let {mutate:shareMutate}=useMutation(
  {
    mutationFn:share,
    onSuccess:function(response){ 
      toast.success("shared post sucessfuly")
        queryClient.invalidateQueries({ queryKey: ["posts"] });

          console.log("Shared post response:", response.data);
            onClose?.();



    },
    onError:function(){
      toast.danger("faild share")
    }
  }
)
function share(){
  return axios.post( `https://route-posts.routemisr.com/posts/${postId}/share`,
    {
      body: content.trim() || "Sharing this great post",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
}


  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-violet-100/60 p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
               {data?.data.data.user?.name[0].toLocaleUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-gray-900 font-bold text-base">
              {data?.data.data.user?.name}
            </h2>

            <button
              type="button"
              className="flex items-center gap-2 mt-1 px-2 py-1 rounded-lg bg-violet-50 text-orbit-violet text-xs font-medium hover:bg-violet-100 transition"
            >
              <FaGlobe />
              Public
              <FaChevronDown />
            </button>
          </div>
        </div>

        {/* Text Area */}
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind ?"
          rows={4}
          className="w-full resize-none border-0 outline-none overflow-hidden relative text-gray-700 text-lg placeholder:text-gray-400 bg-transparent"
        />
        {imageURL &&<div className="relative w-fit  block max-h-100  object-contain   "><img src={imageURL} alt="" className="w-100 h-100 " />
      <button className="absolute top-0 end-0 bg-white cursor-pointer p  " onClick={(()=>setImageURL(""))}><IoMdCloseCircle color="red" size={30}/></button>
       
        </div>
         }

        {/* Add to Post */}
        <div className="p-3 mt-3 mb-5 ">
          <div className="flex flex-wrap items-center gap-2 ">
            <label
            className="flex items-center gap-2 px-3 py-2 z-10 rounded-xl hover:bg-green-50 text-green-600 cursor-pointer transition"
              htmlFor={imageInputId}>
              <FaImage className="text-xl" />
              <span className="text-sm font-medium ">Photo</span>
              
            </label>
            <input
                type="file"
                className="hidden"
                id={imageInputId}
                ref={imageContent}
                onChange={PreviewImage}
                
              />

            <button
              type="button"
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl z-10 hover:bg-amber-50 text-amber-500 transition"
             onClick={() => setShowEmoji(!showEmoji)}
            >
              <FaFaceSmile className="text-xl" />
              <span className="text-sm font-medium">Feeling</span>
                    {showEmoji && (
        <div className="absolute right-0 top-full z-50 mt-2">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setContent((prev) => prev + emojiData.emoji);
              setShowEmoji(false);
            }}
          />
        </div>
      )}
            </button>
          </div>
        </div>

        {/* Publish Button */}
        <button
          type="button"
          onClick={()=>statues==="share"?shareMutate():mutate()}
          disabled={!content.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold shadow-md shadow-violet-200 transition-all duration-300 hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
        >
          {statues==="share"? "Share":"Post"}
          
        </button>
      </div>
    </div>
  );
}
