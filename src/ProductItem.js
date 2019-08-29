import React, { Component } from 'react'

class ProductItem extends Component {
 constructor(props){
  super(props);

  this.state = {
    isEdit : false
  }

  this.onDelete = this.onDelete.bind(this);
  this.onEdit = this.onEdit.bind(this);
  this.onEditSubmit = this.onEditSubmit.bind(this);
 }

 onEdit(){
  this.setState({isEdit : true});
 }
 onEditSubmit(e){
  e.preventDefault();
  this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name)
  this.setState({isEdit : false});
 }
 onDelete(){
  const {name, onDelete } = this.props;
  onDelete(name);
 }
 render() {
  const {name, price } = this.props;
  const {isEdit } = this.state;
  return (
   <div>
     {
       isEdit ? (
       <form onSubmit={this.onEditSubmit}>
         <input type="text" defaultValue={name} placeholder="name" ref={nameInput=>this.nameInput = nameInput}/>
         <input type="text" defaultValue={price} placeholder="price" ref={priceInput=>this.priceInput = priceInput}/>
         <button>Save</button>
       </form>):
       (
         <div>
             <span>{name}</span> {' | '} <span>{price}</span>
              {' | '}
              <button onClick={this.onEdit}>Edit</button>
              {' | '}
              <button onClick={this.onDelete}>Delete</button>
         </div>
       )
     }
     
    </div>
  )
 }
}
export default ProductItem;