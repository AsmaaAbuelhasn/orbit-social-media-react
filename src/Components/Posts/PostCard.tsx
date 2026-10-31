import React, { useContext, useState } from 'react'
import { FaEllipsisH, FaHeart,  FaRegComment, FaRegHeart, FaShare } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Comment from '../Comment/Comment';
import axios, { isAxiosError } from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RingLoader } from 'react-spinners';
import { Button, Dropdown, Label, Modal, toast} from '@heroui/react';
import PostModal from './PostModal';
import CreatePost from '../CreatePost/CreatePost';
import type { Post } from '../../Interfaces/Post';
import type { TopComment } from './../../Interfaces/Post';


interface PostCardProps {
  postItem: Post;
  allComments?: TopComment[];
  deletePost?: (postId: string) => void;
  savedPost?: (postId: string) => void;
}
export default function PostCard({postItem , allComments,deletePost,savedPost}:PostCardProps) {
const [commentContent , setCommentContent] = useState("")
const [liked, setLiked] = useState(false);
let [likes,setLikes]=useState(postItem.likes.length)
const [showComments, setShowComments] = useState(false);
let [isLoading, setIsLoading]=useState(false)
let {token,userId} =useContext(AuthContext)
const query = useQueryClient();
const [selectedPostItem, setSelectedPostItem] = useState<Post | null>(null);
   const [openModel , setOpenModel]=useState(false);




let {mutate}=useMutation(
  {
    mutationFn:addComment,
    onSuccess:function(){ 
      setCommentContent('') 
      query.invalidateQueries({queryKey:['comments',postItem._id]})
      toast.success("comment added sucessfuly")
    },
    onError:function(error){
      isAxiosError(error)?toast.danger(error?.response?.data.message):""
    },
    onSettled:function(){
      setIsLoading(false)
    }
  }
)
console.log(postItem);

function addComment(){
  setIsLoading(true)
  return axios.post(`https://route-posts.routemisr.com/posts/${postItem._id}/comments`,{
      content:commentContent
    },{
      headers:{token}
    },
  )
}
let {mutate:likeMutate}=useMutation(
  {
    mutationFn:addLike,
    onSuccess:function(){ 
      query.invalidateQueries({queryKey:['comments',postItem._id]})
      toast.success("liked post sucessfuly")
      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));

    },
    onError:function(){
      toast.danger("faild add like")
    },
    onSettled:function(){
      setIsLoading(false)
    }

  }
)
function addLike(){
  return axios.put(`https://route-posts.routemisr.com/posts/${postItem._id}/like`,
    {},
    {headers:{token}}
  )
}




function SelectAction(key:React.Key,postItem:Post){
  console.log(key);
  console.log(postItem._id);
  switch(key){
    case 'save-post':savedPost?.(postItem._id);  break;
    case 'edit-post': setSelectedPostItem(postItem);  break;
    case 'delete-post': deletePost?.(postItem._id);  break;
  }
  
}


  return <>
   <article
          key={postItem._id}
          className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6 mt-5"
        >
          {/* Post Header */}
          <div  className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img
                src={postItem.user.photo}
                alt="User avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
              />

              <div>
                <h3 className="font-bold text-gray-900">
                  {postItem.user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  @{postItem.user.username} · {new Date( postItem.createdAt).toLocaleDateString('en-us',{
                    year:'numeric',
                    month:"long",
                    day:"2-digit"
                  })}
                </p>
              </div>
            </div>

            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="More options"
            >
              
               <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        <FaEllipsisH className="text-gray-500" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={((key) =>SelectAction(key,postItem))}>
           
          {userId==postItem.user._id? <><Dropdown.Item id="edit-post" textValue="Edit file">
           <Label>Edit Post </Label>
              
              

          </Dropdown.Item>
          <Dropdown.Item id="delete-post" textValue="Delete file" variant="danger">
            <Label>Delete Post </Label>
          </Dropdown.Item>
        </>  :<Dropdown.Item id="save-post" textValue="Copy link">
            <Label>Save Post</Label>
          </Dropdown.Item>}
         
          </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
            </button>
          </div>
          {selectedPostItem && (
  <PostModal
    postItem={selectedPostItem}
    onClose={() => setSelectedPostItem(null)}
  />
)}

          {/* Post Content */}
          <Link to={`/posts/${postItem._id}`}>
          <div className="px-4 pb-4">
            <p  className="text-gray-800 leading-7">
               {postItem.body}
              
            </p>
          </div>
          </Link>
     

{/* Original Shared Post */}

{/* Share Content */}
{/*{postItem.body && (
  <p className="mb-4  text-gray-700">
    {postItem.body}
  </p>
)}*/}

{/* Original Shared Post */}
{postItem.isShare && postItem.sharedPost && (
  <div className="mt-3 m-10 overflow-hidden rounded-xl border border-gray-200 bg-white">

    {/* Original Post User */}
    <div className="flex items-center gap-3 p-3">
      <img
        src={postItem.sharedPost.user?.photo}
        alt={postItem.sharedPost.user?.name}
        className="h-10 w-10 rounded-full object-cover"
      />

      <div>
        <h4 className="font-semibold text-gray-900">
          {postItem.sharedPost.user?.name}
        </h4>

        <p className="text-xs text-gray-500">
          {postItem.sharedPost.user?.username}
        </p>
      </div>
    </div>

    {/* Original Post Body */}
    {postItem.sharedPost.body && (
      <p className="px-3 pb-3 text-gray-700">
        {postItem.sharedPost.body}
      </p>
    )}

    {/* Original Post Image */}
    {postItem.sharedPost.image && (
      <img
        src={postItem.sharedPost.image}
        alt="Shared post"
        className="max-h-[500px] w-full object-contain"
      />
    )}

  </div>
)}

          

          {/* Post Image */}
          {postItem.image && (
            <img
              src={postItem.image}
              alt="Post"
              className="w-full max-h-[420px] object-cover"
            />
          )}

          {/* Likes and Comments Count */}
          <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 bg-orbit-violet rounded-full text-white text-xs">
                ♥
              </span>
              {likes}
              <span>
                likes
              </span>
            </span>

              <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 bg-orbit-violet rounded-full text-white text-xs">
                <FaRegComment/>
              </span>
              {postItem.commentsCount}
              <span>
                comments
              </span>
               
            </span>

              <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 bg-orbit-violet rounded-full text-white text-xs">
                <FaShare/>
              </span>
              {postItem.sharesCount}
              <span>
                shares
              </span>
               
              
            </span>
          </div>

          {/* Post Actions */}
          <div className="grid grid-cols-3 px-2 py-2">
            <button
              onClick={()=>likeMutate()}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl transition hover:bg-gray-50 ${
                liked ? "text-orbit-violet" : "text-gray-600"
              }`}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span className="font-medium">Like</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
            >
              <FaRegComment />
              <span className="font-medium">Comment</span>
            </button>

             <Modal isOpen={openModel} onOpenChange={setOpenModel}>
  <Button
    onPress={() => setOpenModel(true)}
    className="flex w-full h-full items-center justify-center gap-2 py-3 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition"
  >
    <FaShare />
    <span className="font-medium">Share</span>
  </Button>

  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog className="sm:max-w-[700px] overflow-auto">
        <Modal.CloseTrigger />

        <CreatePost
          postBody=""
          statues="share"
          postId={postItem._id}
        
        />
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>

           
          </div>

          {/* Top Comment */}
          

         {allComments && allComments.length > 0 ? (
  allComments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ))
) : (
  postItem.topComment && (
    <Comment comment={postItem.topComment} />
  )
)}
            
          {/* Comment Input */}
          {showComments && (
            <div className="p-4 border-t border-gray-100 flex gap-3">
              <input
                value={commentContent}
                onChange={(e)=>setCommentContent(e.target.value)}
                type="text"
                placeholder="Write a comment..."
                className="flex-1 min-w-0 px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-purple-300"
              />
               {isLoading &&<RingLoader color="purple" size={30} />}

              <button onClick={()=>mutate()}  className="text-orbit-violet font-semibold hover:cursor-pointer">
                comment
              </button>
            </div>
          )}
        </article>
  
  </>
}
