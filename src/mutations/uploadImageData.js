import gql from 'graphql-tag';

export default gql`
  mutation uploadImageData(  
    $name: String,
    $width: String,
    $height: String,
    $image: String
  ){
    uploadImageData (
        name : $name,
        width : $width,
        height : $height,
        image : $image 
    ) {
        id
        name
        overlay
        width
        height
        url
    }
  }
`;