import { FaEllipsisH } from 'react-icons/fa';
import type { TopComment } from '../../Interfaces/Post';
interface CommentProps {
  comment: TopComment;
}

export default function Comment({comment}:CommentProps) {
  return <>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img
                src={comment.commentCreator.photo}
                alt="User avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
              />

              <div>
                <h3 className="font-bold text-gray-900">
                  {comment.commentCreator.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {comment.content} 
                </p>
              </div>
            </div>

            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="More options"
            >
              <FaEllipsisH className="text-gray-500" />
            </button>
          </div>

          </> 
}
