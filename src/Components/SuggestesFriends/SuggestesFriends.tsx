
import axios from "axios";
import { useContext, useState } from "react";
import { FaSearch, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { AuthContext } from './../../Context/AuthContext';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react";
import type { Friend } from "../../Interfaces/Friends";

export default function SuggestedFriends() {
  const [search, setSearch] = useState("");
  const [followed, setFollowed] = useState<string[]>([]);
  let {token}=useContext(AuthContext)
  const query= useQueryClient()

  function getSuggestedFriends(){
    return axios(`https://route-posts.routemisr.com/users/suggestions?limit=10`,
        {headers:{token}}
    )
  }
  let {data}=useQuery(
    {queryFn:getSuggestedFriends,
        queryKey:['suggFriend']
    }
  )
  console.log(data?.data.data.suggestions);
  

 const friends:Friend[] = data?.data?.data.suggestions ?? [];

const filteredFriends = friends.filter((friend:Friend) =>
  `${friend.name} ${friend.username}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  

  function followUser(id:string){
  return axios.put(`https://route-posts.routemisr.com/users/${id}/follow`,
    {},
    {headers:{token}}
  )}
  const {mutate}=useMutation({
    mutationFn:followUser,
    onError:()=>toast.danger("failed"),
    onSuccess:(response,id)=>{
        const isFollowing = response.data.data.following;

      toast.success('follow sucessfull')
        setFollowed((prev) =>
    isFollowing
      ? [...prev, id]
      : prev.filter((userId) => userId !== id)
  );
        query.invalidateQueries({queryKey:['suggFriend']})
    },

    
  })

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900">
          Suggested Friends
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Discover people you may know
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search people..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Friends List */}
      <div className="space-y-4">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => {
            const isFollowed = followed.includes(friend._id);

            return (
            
              <div
                key={friend._id}
                className="flex items-center gap-3"
              >
                {/* Avatar */}
                <div className="flex shrink-0 items-center justify-center rounded-full ">
                  <img className="rounded-full h-15 w-15" src={friend.photo}/>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {friend.name}
                  </h3>
                  <p className="truncate text-xs text-gray-500">
                    {friend.username}
                  </p>
                </div>

                {/* Follow */}
                <button

                  type="button"
                  onClick={() => mutate(friend._id)}
                  className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs cursor-pointer font-semibold transition ${
                    isFollowed
                      ? "bg-gray-100 text-gray-600"
                      : "bg-orbit-violet text-white hover:bg-orbit-ink"
                  }`}
                >
                  {isFollowed ? (
                    <>
                      <FaUserCheck />
                      Following
                    </>
                  ) : (
                    <>
                      <FaUserPlus />
                      Follow
                    </>
                  )}
                </button>
              </div>
            );
          })
        ) : (
          <p className="py-6 text-center text-sm text-gray-500">
            No people found
          </p>
        )}
      </div>

      <button
        type="button"
        className="mt-5 w-full border-t border-gray-100 pt-4 text-sm font-semibold text-orbit-violet hover:text-orbit-ink cursor-pointer"
      >
        See all people
      </button>
    </aside>
  );
}
