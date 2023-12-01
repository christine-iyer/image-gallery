export default function setClass(image, styles){
     if(image.category === 'Work'){
          return styles.work
     }
     if(image.category === 'Family'){
          return styles.family
     }
     if(image.category === 'Code'){
          return styles.code
     }
     if(image.category === 'Misc'){
          return styles.misc
     }
     if(image.category === 'Friends'){
          return styles.friends
     }
}