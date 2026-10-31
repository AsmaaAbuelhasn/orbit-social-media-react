import React, { useState } from 'react'
import CreatePost from '../../Components/CreatePost/CreatePost'
import Sidebar from '../../Components/Layout/Sidebar/Sidebar'
import Posts from '../../Components/Posts/Posts'
import SuggestedFriends from '../../Components/SuggestesFriends/SuggestesFriends'

export default function Feeds() {
    const [activeTab, setActiveTab] = useState("Feed");


  return (
 
<div className="w-full max-w-[1300px] mx-auto mt-5 px-6">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

  { /* <div className="hidden lg:block lg:col-span-3">
      <Sidebar />
    </div>*/}
    <div className="min-w-0 lg:col-span-9 md:col-span-12 sm:col-span-12  flex gap-7 h-130">
      <Sidebar
          activeTab={activeTab}
            setActiveTab={setActiveTab} />
   <div className="min-w-0 w-full lg:col-span-6">
  <div className="w-full">
    <CreatePost />
  </div>

  <div className="mt-4 flex w-full flex-col gap-4">
    <Posts activeTab={activeTab} />
  </div>
</div>
    </div>

    <div className="hidden lg:block lg:col-span-3">
      <SuggestedFriends />
    </div>

  </div>
</div>
   


   
  )
}
