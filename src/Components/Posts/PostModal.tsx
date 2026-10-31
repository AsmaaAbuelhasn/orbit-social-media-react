import { Modal } from "@heroui/react";
import CreatePost from "../CreatePost/CreatePost";
import type { Post } from "../../Interfaces/Post";


type PostModalProps = {
  postItem: Post;
  onClose: () => void;
};
export default function PostModal({postItem,onClose}:PostModalProps) {
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
