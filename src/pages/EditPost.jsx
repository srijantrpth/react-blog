import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!slug) {
                    navigate('/')
                    return
                }

                const fetchedPost = await appwriteService.getPost(slug)
                if (fetchedPost) {
                    setPost(fetchedPost)
                } else {
                    navigate('/')
                }
            } catch (error) {
                console.error('Error fetching post:', error)
                navigate('/')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug, navigate])

    if (loading) {
        return (
            <div className='py-8'>
                <Container>
                    <div className='w-full h-screen flex items-center justify-center'>
                        <p>Loading...</p>
                    </div>
                </Container>
            </div>
        )
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost