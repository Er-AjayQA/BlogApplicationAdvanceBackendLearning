export interface IFileService {
  upload(localFilePath: string): Promise<string>;
  remove(imageUrl: string): Promise<void>;
}
