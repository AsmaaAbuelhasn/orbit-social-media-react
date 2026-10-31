import { Button, Modal, toast } from '@heroui/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import CreatePost from '../CreatePost/CreatePost'
import PostCard from './PostCard';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleCheck } from '@gravity-ui/icons';

export default function PostModal({postItem,onClose}) {
 const [isOpen, setIsOpen] =useState(false);
   /* function editPost(postId){
        console.log("edit Post function from modal"+postId);
          return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,
      {headers:{token}})
        
    }
     const query = useQueryClient();
      let{mutate:editPostMutate}=useMutation(
        {mutationFn:editPost,
          onError:(()=>{toast.danger("Failed edit Post")}),
          onSuccess:(()=>{toast.success("Edit post sucessfully")
                query.invalidateQueries({queryKey:['posts']})
          })
        })
      /*  function deletePost(postId){
    console.log("delete post function ")
    console.log(postId+" from axios");
    

    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,
      {headers:{token}}
    )
  }*/

  
   
  console.log(postItem);
  
  return <>
 <Modal>
      <Modal.Backdrop isOpen={true} onOpenChange={(open) => {
        if (!open) onClose();
      }}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[500px] overflow-auto ">
            <Modal.CloseTrigger />
               <CreatePost postId={postItem._id} postBody={postItem.body}  postImage={postItem.image} onClose={onClose} />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  </>
}
