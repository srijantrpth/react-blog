import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
  $id,
  title,
  featuredImage
}) {
  const [image, setImage] = useState("")
console.log("PostCard", featuredImage, title, $id);

  
  useEffect(() => {
    
    appwriteService.getFilePreview(featuredImage).then((image) => setImage(image))
    
  }, [featuredImage])  
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>

<div className='w-full justify-center mb-4'>

  <img src={image} alt="{title}" className='rounded-xl '/>

</div>
<h2 className='text-xl font-bold text-gray-50'>{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard