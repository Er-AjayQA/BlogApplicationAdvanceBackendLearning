export interface IPostRepository {
  createPost(
    userId: string,
    title: string,
    description: string,
    imageUrl?: string,
  ): Promise<any>;
}
