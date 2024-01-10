import {useState} from 'react'
export default function Picture(){
     return(
          <img
          className="avatar"
          src={block.imageUrl}
          alt={'Photo of ' + block.name}
          style={{
            width: block.imageSize,
            height: block.imageSize
          }}
        />
     )
}