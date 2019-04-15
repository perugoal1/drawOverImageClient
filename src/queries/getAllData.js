import gql from 'graphql-tag';

export default gql`
  {
    getAllData {
        id,
        name,
        width,
        height,
        url 
    }
  }
`;