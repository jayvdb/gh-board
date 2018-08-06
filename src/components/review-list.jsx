import {Component} from 'react';
import * as BS from 'react-bootstrap';

import ColoredIcon from './colored-icon';

const MIN_CHILDREN_TO_SHOW = 10;


class ReviewList extends Component {
  state = {morePressedCount: 0, showCSVModal: false};

  showAllReviews = () => {
    this.setState({showAllReviews: true});
  };

  onClickMore = () => {
    this.setState({morePressedCount: this.state.morePressedCount + 1});
  };

  toggleCSVModal = () => {
    const {showCSVModal} = this.state;
    this.setState({showCSVModal: !showCSVModal});
  };

  render() {
    const {icon, backgroundColor, children} = this.props;
    const {isOver} = this.props; // from the collector
    const {showAllReviews, morePressedCount} = this.state;
    const multiple = 25; // Add 25 results at a time

    let className = 'column-title';
    if (icon) {
      className += ' has-icon';
    }

    let iconEl;
    if (icon) {
      iconEl = (
        <ColoredIcon className='column-icon' color={backgroundColor}>{icon}</ColoredIcon>
      );
    }

    const header = (
      <h2 className={className}>
        {iconEl}Meta-reviews in Need ({children.length})
      </h2>
    );

    const classes = {
      'issue-list': true,
      'is-over': isOver
    };

    let partialChildren;
    let moreButton;
    if (!showAllReviews && MIN_CHILDREN_TO_SHOW + (1 + morePressedCount) * multiple < children.length) {
      partialChildren = children.slice(0, MIN_CHILDREN_TO_SHOW + morePressedCount * multiple);
      moreButton = (
        <BS.Button onClick={this.onClickMore} className='list-group-item'>
          {children.length - (morePressedCount + 1) * multiple} more...
        </BS.Button>
      );
    } else {
      partialChildren = children;
    }

    return (
      <BS.Panel className={classes} header={header}>
        <BS.ListGroup fill>
          {partialChildren}
          {moreButton}
        </BS.ListGroup>
      </BS.Panel>
    );

  }
}

export default ReviewList;
