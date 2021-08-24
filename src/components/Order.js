import React from 'react';
import PropTypes from 'prop-types';
import Shipment from './Shipment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

  static propTypes = {
    burgers: PropTypes.object,
    order: PropTypes.object,
    deleteFromOrder: PropTypes.func
  }

  renderOrder = (key) => {
    const { burgers, order } = this.props;

    const burger = burgers[key];
    const count = order[key];

    const isAvaliable = burger &&  burger.status === 'available';

    const transitionOptions = {
      classNames: "order", 
      key,
      timeout: {enter: 500, exit: 500}
    }

    if (!burger) return null;

    if (!isAvaliable) {
      return (
      <CSSTransition 
        {...transitionOptions}
      >
        <li className="unavailable" key={key}>
          Извините, {burger ? burger.name : 'бургер'} временно не доступен
        </li>
      </CSSTransition>
      );
    }

    return (
    <CSSTransition 
      {...transitionOptions}
    >
      <li key={key}>
        <span>
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          

          шт. {burger.name}
          <span> {count * burger.price} ₽</span>
        </span>
  
        <button 
          onClick={() => this.props.deleteFromOrder(key)}
          className="cancellItem"
        >&times;</button>
      </li>
    </CSSTransition>
    );
          
  };

  render() {
    const { burgers, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const burger = burgers[key];
      const count = order[key];

      const isAvaliable = burger && burger.status === 'available';
      if (isAvaliable) {
        return prevTotal + burger.price * count;
      }
      return prevTotal;
      
    }, 0)

    return(
      <div className="order-wrap">
        <h2>Ваш заказ</h2>
        <TransitionGroup 
          component='ul' 
          className="order"
        >
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        {total > 0 ? (
          <Shipment total={total} />
          )
          : 
          (<div className="nothingSelected">
            Выберете блюда и добавьте к заказу
          </div>)

        }
      </div>
    )
  }
}

export default Order;