/**
 * @file index.js
 * @date 2019-05-29 20.25.00
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavigationPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nextLocation: null, openModal: false };
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.unblock = this.props.history.block(nextLocation => {
      if (this.props.when) {
        this.setState({
          openModal: true,
          nextLocation
        });
      }
      return !this.props.when;
    });
  }

  componentWillUnmount() {
    this.unblock();
  }

  onCancel() {
    this.setState({ nextLocation: null, openModal: false });
    this.props.history.goBack();
  }

  onConfirm() {
    this.setState({ openModal: false });
    this.navigateToNextLocation();
  }

  navigateToNextLocation() {
    this.unblock();
    this.props.history.replace(this.state.nextLocation.pathname);
  }

  render() {
    return (
      <div>
        {this.props.children(
          this.state.openModal,
          this.onConfirm,
          this.onCancel
        )}
      </div>
    );
  }
}

NavigationPrompt.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired
};

export default withRouter(NavigationPrompt);
