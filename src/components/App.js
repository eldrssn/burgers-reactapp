import React from 'react';
import Header from './Header';
import MenuAdmin from './MenuAdmin';
import Order from './Order';
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';
import base from '../base';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import SignIn from './Auth/SignIn';


class App extends React.Component {

  static propTypes = {
    match: PropTypes.object
  }

  state = {
    burgers: {},
    order: {}
  }

  componentDidMount() {
    const {params} = this.props.match;

    const localStorageRef = localStorage.getItem(params.id);
    if (localStorageRef) {
      this.setState({ order : JSON.parse(localStorageRef)})
    }
    

    this.ref = base.syncState(`${params.id}/burges`, {
      context: this,
      state: 'burgers'
    })
  }

  componentDidUpdate() {
    const {params} = this.props.match;
    localStorage.setItem(params.id, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  
  addBurger = (burger) => {
    const burgers = {...this.state.burgers};
    burgers[`burger${Date.now()}`] = burger;
    this.setState({burgers})
  }

  updateBurger = (key, updatedBurger) => {
    const burgers = {...this.state.burgers};
    burgers[key] = updatedBurger;
    this.setState({burgers});
  }

  deleteBurger = (key) => {
    const burgers = {...this.state.burgers};
    burgers[key] = null;
    this.setState({burgers});
  }

  deleteFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  loadSampleBurgers = () => {
    this.setState({burgers: sampleBurgers})
  }

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({order})
  }

  handleLogout = async () => {
    await firebase.auth().signOut();
    window.location.reload();
  }

  render() {
    return(
      <SignIn>
        <div className="burger-paradise">
          <div className="menu">
            <Header title="Hot Burger"/>
            <ul className="burgers">
              {Object.keys(this.state.burgers).map(key => {
                return <Burger 
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}  
                />
              })}
            
            </ul>
          </div>
          <Order
            deleteFromOrder={this.deleteFromOrder}
            burgers={this.state.burgers}
            order={this.state.order}
          />
          <MenuAdmin 
            burgers={this.state.burgers}
            addBurger={this.addBurger}
            loadSampleBurgers={this.loadSampleBurgers}
            updateBurger = {this.updateBurger}
            deleteBurger = {this.deleteBurger}
            handleLogout={this.handleLogout}
          />
        </div>
      </SignIn>
    )
  }
}

export default App;