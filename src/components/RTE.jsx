import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../../conf'
export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'>{label && <label className='inline-block mb-1 pl-1>'>{label}</label>}
    <Controller
    name = {name || 'Content'}
    control = {control}
    defaultValue = {defaultValue}
    render = {({field: {onChange}})=>(
      <Editor
      apiKey={conf.rteApiKey}
      initialValue={defaultValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
         

      }}
      onEditorChange={onChange}
      />  
    )}
    />

    </div>
  )
}

