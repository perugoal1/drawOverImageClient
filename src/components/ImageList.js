import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import query from '../queries/getAllData';

import ImageDetail from './ImageDetail';

class ImageList extends Component {

    render() {
      const { data } = this.props;
      console.log(data.getAllData);
      return (
        <div className="App-header">
            <div className="container">
            <div>
                <Link to="/addImage/">  
                    <button type="button" className="btn btn-success">Add A New Image</button>
                </Link>
            </div>
            <div className="row">
                { data.getAllData &&  data.getAllData.map((obj, index) => {
                        return (
                            <div style={{display: 'inline-block'}}>
                                <ImageDetail data={obj} index={index}/>
                            </div>
                        )
                })}
            </div>
            </div>
        </div>

        );
    }
}


export default graphql(query)(ImageList);