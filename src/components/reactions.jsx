import * as BS from 'react-bootstrap';

function Reactions({stat}) {
  // use null when count is zero because we don't want to display
  // number zero on frontend
  const reactions = [
    {
      emoji: '👍',
      count: stat.THUMBS_UP || null,
      name: 'THUMBS_UP'
    },
    {
      emoji: '👎',
      count: stat.THUMBS_DOWN || null,
      name: 'THUMBS_DOWN'
    },
    {
      emoji: '😄',
      count: stat.LAUGH || null,
      name: 'LAUGH'
    },
    {
      emoji: '🎉',
      count: stat.HOORAY || null,
      name: 'HOORAY'
    },
    {
      emoji: '😕',
      count: stat.CONFUSED || null,
      name: 'CONFUSED'
    },
    {
      emoji: '❤️',
      count: stat.HEART || null,
      name: 'HEART'
    }
  ];
  return reactions.map(reaction => (
      <BS.Button bsClass="reaction-btn">
        {reaction.emoji} {reaction.count}
      </BS.Button>
  ));
}

export default Reactions;
