import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class Block extends Component{
  constructor(props){
    super(props);
    this.state{
      img: '',
      title: '',
      description: ''
    };
  }
  render (){
    const {
      img,
      title,
      description
    } = this.state;
  
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={img} alt={title} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};
};

export default Block;