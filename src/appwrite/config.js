import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../../conf.js";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, userId, content, featuredImage, status }) {
    try {
      const createdPost = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, featuredImage, status, userId, content }
      );
      if (!createdPost) {
        console.log("Appwrite Create Post Error: Post not created");
        throw new Error("Post not created");
      }
      return createdPost;
    } catch (error) {
      console.log(`Appwrite Create Post Error: ${error}`);

      throw error;
    }
  }
  async updatePost(slug,{ title, content, featuredImage, status }) {
    console.log(slug);
    
    try {
      const updatedPost = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, featuredImage, status, content }
      );
        if (!updatedPost) {
            console.log("Appwrite Update Post Error: Post not updated");
            throw new Error("Post not updated");
        }
        return updatedPost;
    } catch (error) {
      console.log(`Appwrite Update Post Error: ${error}`);
      throw error;
    }
  }
  async deletePost(slug){
    try {
      console.log(slug)

        const deletedPost = await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            
            slug
        )
        if(!deletedPost){
            console.log('Appwrite Delete Post Error: Post not deleted');
            throw new Error('Post not deleted')
        }
        return deletedPost
    } catch (error) {
        console.log(`Appwrite Delete Post Error: ${error}`);
        throw error
        
    }
  }

  async getPost(slug){
    try {
        const post = await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        if(!post){
            console.log('Appwrite Get Post Error: Post not found');
            throw new Error('Post not found')
        }
        return post
    } catch (error) {
        console.log(`Appwrite Get Post Error: ${error}`);
        throw error
        
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
try {
    const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
    )
    if(!posts){
        console.log('Appwrite Get Posts Error: Posts not found');
        throw new Error('Posts not found')
    }

return posts
} catch (error) {
    console.log(`Appwrite Get Posts Error: ${error}`);  
    throw error
    
}
  }
  

async uploadFile(file){
try {
  return await this.bucket.createFile(
    conf.appwriteBucketId,
    ID.unique(),
  
    
    file

  )

} catch (error) {
  console.log(`Appwrite Upload File Error: ${error}`);
  return false
  
}

}


async deleteFile(fileId){
  try {
    return await this.bucket.deleteFile(
      conf.appwriteBucketId,
      fileId
    )
  } catch (error) {
    console.log(`Appwrite Delete File Error: ${error}`);
    return false}
}

async getFilePreview(fileId){
  return this.bucket.getFilePreview(
    conf.appwriteBucketId,
    fileId
  )
}

}

const service = new Service()
export default service