import ReactDOM from "react-dom"

const ProductCategoryRow = React.createClass({
  render: function() {
    return (
      <tr><th colSpan='2'>{this.props.category}</th></tr>
    );
  }
});

const ProductRow = React.createClass({
  render: function() {
    const name = this.props.product.stocked ? this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

const ProductTable = React.createClass({
  render: function() {
    console.log(this.props);
    let rows = [];
    let lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) return;
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

const SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      ReactDOM.findDOMNode(this.refs.filterTextInput).value,
      ReactDOM.findDOMNode(this.refs.inStockOnlyInput).checked
    );
  },
  render: function() {
    return(
      <form>
        <input
          type='text'
          placeholder='Search...'
          value={this.props.filterText}
          ref='filterTextInput'
          onChange={this.handleChange}
        />
        <p>
          <input
            type='checkbox'
            checked={this.props.isStockOnly}
            ref='inStockOnlyInput'
            onChange={this.handleChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

const FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});

const PRODUCTS = [
  {category: 'Sproting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sproting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sproting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electornics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electornics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electornics', price: '$199.99', stocked: true, name: 'Nexus 7'},
];

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.querySelector('#container'));
