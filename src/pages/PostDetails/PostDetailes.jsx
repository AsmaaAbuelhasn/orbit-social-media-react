import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from './../../Context/AuthContext';
import axios from 'axios';
import PostCard from './../../Components/Posts/PostCard';
import Loader from './../../Components/Loader/Loader';

export default function PostDetailes() {

    let {id}=useParams()
    let {token}=useContext(AuthContext)
    let {data ,isLoading}=  useQuery(
        {
            queryKey:['post',id],
            queryFn:getDetails,
            select:(data) => data.data.data.post,
            gcTime:5000
        }
    )
    
     let {data:commentsData ,isLoading:commentIsLoading}=  useQuery(
        {
            queryKey:['comments',id],
            queryFn:getComments,
            select:(data) => data.data.data.comments,
            //gcTime:5000
        }
    )

    if(isLoading){
        return <Loader/>
    }
    if(commentIsLoading){
        return <Loader/>
    }
    console.log(data)

   function getDetails(){
        return axios(`https://route-posts.routemisr.com/posts/${id}`,
            {
                headers:{
                    token
                }
            }
        )

    }
       function getComments(){
        return axios(`https://route-posts.routemisr.com/posts/${id}/comments`,
            {
                headers:{
                    token
                }
            }
        )

    }
    console.log(commentsData)

  return (
    <div>
     {data && <PostCard allComments={commentsData} postItem={data}/> }
     
    </div>
  )
}
