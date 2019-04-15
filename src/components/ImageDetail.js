import React, { Component } from 'react';
import $ from 'jquery';

class ImageDetail extends Component {

    render() {
      const { data , index } = this.props;
      return (
            <div>
                <img  src={data.url}  width={data.width} height={data.height} style={{zoom :'0.5', margin: '20px'}}/>
                <span className="imgName">{data.name}</span>
            </div>
        );
    }
    

    componentDidMount(){
       
    }
}


export default (ImageDetail);