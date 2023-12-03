export default function setClass(image, styles){
     if(image.category === 'Paint'){
          return styles.paint
     }
     if(image.category === 'Markers'){
          return styles.markers
     }
     if(image.category === 'Crayons'){
          return styles.crayons
     }
     if(image.category === 'Mixed'){
          return styles.mixed
     }
     if(image.category === 'Schoolwork'){
          return styles.schoolwork
     }
}