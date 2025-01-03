import { useState, useEffect } from "react";
import React from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        const postsData = await appwriteService.getPosts();
        if (mounted && postsData && postsData.documents) {
          // Enhanced validation for each post
          const validPosts = postsData.documents.filter(post => 
            post && 
            post.$id &&
            post.title && 
            typeof post.title === 'string' &&
            post.featuredImage &&
            typeof post.featuredImage === 'string'
          );
          console.log("Valid posts:", validPosts);
          setPosts(validPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  // Don't render anything until we have posts
  if (loading || !posts) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="w-full bg-gray-200 rounded-lg p-4 animate-pulse h-64"/>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <PostCard 
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center">
              <p>No posts found</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;