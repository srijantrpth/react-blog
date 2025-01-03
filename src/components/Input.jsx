import React, { useId } from 'react'

const Input = React.forwardRef(({
label,
type = 'text',
className = '',
...props
},ref)=>{
  const id = useId()
return <div className='w-full'>{label && <label className={`inline-block mb-1 pt-1 `} htmlFor={id} >{label}</label>}
<input
className={`${className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
type = {type}
{...props}
ref = {ref}
/></div>
})
export default Input