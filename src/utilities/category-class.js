export default function setClass(image, styles){
     if(image.category === '🟧'){
          return styles.work
     }
     if(image.category === '🟪'){
          return styles.family
     }
     if(image.category === '⬜️'){
          return styles.code
     }
     if(image.category === '🟥'){
          return styles.misc
     }
     if(image.category === '🟦'){
          return styles.friends
     }

     

}