import { Heart, MessageCircle, SendHorizontal, Bookmark, MoreHorizontal } from 'lucide-react';

interface InstagramPostProps {
  username: string;
  userAvatar: string;
  postImage: string;
  likes: number;
  caption: string;
  timeAgo: string;
}

export function InstagramPost({ username, userAvatar, postImage, likes, caption, timeAgo }: InstagramPostProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img 
            src={userAvatar} 
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm">{username}</span>
        </div>
        <button className="text-gray-900">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Image */}
      <img 
        src={postImage} 
        alt="Post"
        className="w-full aspect-square object-cover"
      />

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button className="hover:text-gray-500">
              <Heart size={24} />
            </button>
            <button className="hover:text-gray-500">
              <MessageCircle size={24} />
            </button>
            <button className="hover:text-gray-500">
              <SendHorizontal size={24} />
            </button>
          </div>
          <button className="hover:text-gray-500">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">{likes.toLocaleString()} likes</div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          <span>{caption}</span>
        </div>

        {/* Time */}
        <div className="text-xs text-gray-400 mt-2">{timeAgo}</div>
      </div>
    </div>
  );
}