import { PostListItem } from "./post.response.js";

export const toPostItemResponse = (post: PostListItem): PostListItem => {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    userId: post.userId,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

export const toPostListResponse = (posts: PostListItem[]): PostListItem[] => {
  return posts.map((post: PostListItem) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    userId: post.userId,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
};
