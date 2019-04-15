import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import $ from 'jquery';
import uploadImageData from '../mutations/uploadImageData';

class ImageList extends Component {

    constructor(props){
        super(props);
        this.state = {
            width : 0,
            height: 0,
            img : null,
            lineColor : 'black',
            lineSize : 1,
            name : null,
            showLoading: false
        }
    }

    render() {
      const { data } = this.props;
      if(this.state.img){
            this.updateCanvas();
      }
      
      return (
        <div className="App-header">
            <div className="container">
                <h3><strong>Upload File</strong> And Click and draw On them</h3>
                
                <div className="form-group file-area">
                    <input type="file" name="images" id="images" required="required"/>
                    <div className="file-dummy">
                    <div className="success">Great, your files are selected. Keep on.</div>
                    <div className="default">Upload Image</div>
                    </div>
                </div>
                    <div className="form-group row">
                            <label for="ex1">Title</label>
                            <input type="text"  className="form-control" value={this.state.name}  onChange={(ev)=> this.setState({name : ev.target.value })}/>
                    </div>
                   <div>
                    <div className="form-group row"> 
                        <div className="col-2">
                            <label for="ex1">Img Width</label>
                            <input type="text"  className="form-control" value={this.state.width}  onChange={(ev)=> this.setState({width : ev.target.value })}/>
                        </div>
                        <div className="col-2">
                            <label for="ex2">Img Height</label>
                            <input type="text" className="form-control" value={this.state.height}  onChange={(ev)=> this.setState({height : ev.target.value })}/>
                        </div>
                        <div className="col-2">
                            <label for="ex2">Border Color</label>
                            <select className="form-control form-control-sm" value={this.state.lineColor}  onChange={(ev)=> this.setState({lineColor : ev.target.value })}>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label for="ex2">Border Size</label>
                            <input type="text" className="form-control" value={this.state.lineSize}  onChange={(ev)=> this.setState({lineSize : ev.target.value})}/>
                        </div>
                        <div className="col-3">
                             <button type="submit"  className="btn btn-info mt45" onClick={this.clearArea}> Clear </button>
                        </div>
                    </div>
                  
                    </div>
                    <div className="form-group">
                        <button type="submit"  className="btn btn-primary" disabled={!(this.state.img && this.state.name)} onClick={this.uploadData} >
                        {this.state.showLoading && <span className="spinner-border spinner-border-sm mr10" role="status" aria-hidden="true"></span>}
                        Upload Finished Drawing
                        </button>
                    </div>
                    <canvas id="myCanvas" width={this.state.width }height={this.state.height} >
                    </canvas>
            </div>          
        </div>

        );
    }

    componentDidMount(){
        let mousePressed = false;
        let lastX, lastY;

        let imageLoader = document.getElementById('images');
            imageLoader.addEventListener('change', handleImage, false);
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext("2d");
        let that = this;
        function handleImage(e){
            var reader = new FileReader();
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    ctx.drawImage(img, 0, 0 );
                    that.setState({height: img.height , width:  img.width, img : event.target.result });
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);     
        }

        $('#myCanvas').mousedown(function (e) {
            mousePressed = true;
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
            //Draw(e.pageX, e.pageY, false);
          });
          
          $('#myCanvas').mousemove(function (e) {
            if (mousePressed) {
              Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
             // Draw(e.pageX , e.pageY , true);
            }
          });
          
          $('#myCanvas').mouseup(function (e) {
            mousePressed = false;
            that.setState({img : document.getElementById('myCanvas').toDataURL("image/png")})
          });
          $('#myCanvas').mouseleave(function (e) {
            mousePressed = false;
          });
        
        function Draw(x, y, isDown) {
          if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = that.state.lineColor ;
            ctx.lineWidth = that.state.lineSize;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
          }
          lastX = x; lastY = y;
          
        }
        
      

    }


    clearArea = () => {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0,  ctx.canvas.width, ctx.canvas.height);
    }

    updateCanvas = ()=>{
        let that = this;
        let mousePressed = false;
        let lastX, lastY;
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0 );
        }
        img.src = this.state.img;


        

        //document.getElementById('imageCanvas').toDataURL("image/png")
    }

    uploadData = () => {
        this.setState({showLoading : true})
        let imageCanvas = $('#imageCanvas').clone();
        $('img', imageCanvas ).remove();
        let overlayData = imageCanvas.html();


        this.props.client.mutate({
            mutation: uploadImageData ,
            variables: { 
                name: this.state.name,
                overlay: overlayData,
                width: this.state.width,
                height: this.state.height,
                image: this.state.img
            },
          }).then((data)=>{ 
            window.location.href = "/";
        });

    }
}


export default withApollo (ImageList);