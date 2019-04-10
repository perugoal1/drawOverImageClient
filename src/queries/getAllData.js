import gql from 'graphql-tag';

export default gql`
  {
    getAllData {
        id,
        name,
        overlay,
        width,
        height,
        url 
    }
  }
`;