import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/getAllData';

class ImageList extends Component {
    render() {
      const { data } = this.props;
      console.log(data);
      return (
        <div className="App-header">
            <div className="container">
            <div className="row">
                <div className="col-sm-4 Image-list">
                    <img src="https://theadsgroup.com/content/uploads/2012/12/unicorn-wallpaper.jpg"  className="img-thumbnail"/>
                </div>
                <div className="col-sm-4 Image-list">
                    <img src="https://theadsgroup.com/content/uploads/2012/12/unicorn-wallpaper.jpg"  className="img-thumbnail"/>
                </div>
                <div className="col-sm-4 Image-list">
                    <img src="https://theadsgroup.com/content/uploads/2012/12/unicorn-wallpaper.jpg"  className="img-thumbnail"/>
                </div>
                <div className="col-sm-4 Image-list">
                    <img src="https://theadsgroup.com/content/uploads/2012/12/unicorn-wallpaper.jpg" className="img-thumbnail"/>
                </div>
                <div className="col-sm-4 Image-list">
                    <img src="https://theadsgroup.com/content/uploads/2012/12/unicorn-wallpaper.jpg"  className="img-thumbnail"/>
                </div>

            </div>
            </div>
        </div>

        );
    }
}


export default graphql(query)(ImageList);