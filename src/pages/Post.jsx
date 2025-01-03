import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image, setImage] = useState("");
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {   
            try {
                if(!slug) {
                    navigate("/");
                    return;
                }
                const postData = await appwriteService.getPost(slug);
                if(!postData) {
                    navigate("/");
                    return;
                }
                const imageUrl = await appwriteService.getFilePreview(postData.featuredImage);
                if(!imageUrl) {
                    navigate("/");
                    return;
                }
                setPost(postData);
                setImage(imageUrl);
            } catch (error) {
                console.log(`Error while fetching post data: ${error}`);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        
      await appwriteService.deletePost(post.$id).then((status) => {
       
        
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {!imageLoaded && (
                        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl" />
                    )}
                    <img
                        src={image}
                        alt={post.title}
                        className={`rounded-xl ${!imageLoaded ? 'hidden' : ''}`}
                        onLoad={handleImageLoad}
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
