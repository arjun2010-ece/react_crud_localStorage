import React, { Component } from 'react'
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

const products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name: 'iPhone',
    price: 600
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products')) || []
    }

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount(){
    const products = this.getProducts();
    this.setState({products});
  }

  getProducts(){
    return this.state.products;
    
  }
  onDelete(name){
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.name !== name);
    this.setState({products: filteredProducts});

  }
  onAdd(name, price){
    const products = this.getProducts();
    products.unshift({name, price});
    this.setState({products});
  }
  onEditSubmit(name, price, originalName){
    console.log(name, price);
    
    let products = this.getProducts();
    products = products.map(product => {
      if(product.name === originalName){
        product.name = name;
        product.price = price;
      }
      return product;
    });
    this.setState({ products });
    
  }
  render() {
    const {products} = this.state;
    return (
      <div className="container">
        <h1>products Manager</h1>

        <AddProduct onAdd={this.onAdd} />

        {
          products.map(product => (
            <ProductItem 
                key={product.name} 
                {...product} 
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit} />
          ))
        }
      </div>
    )
  }
}
export default App;