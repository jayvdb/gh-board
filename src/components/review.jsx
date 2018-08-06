import * as BS from 'react-bootstrap';
import classnames from 'classnames';
import {Link} from 'react-router';

import {getFilters} from '../route-utils';
import IssueStore from '../issue-store';

import GithubFlavoredMarkdown from './gfm';
import Time from './time';
import ReviewBlurb from './review-blurb';
import IssueOrPullRequestBlurb from './issue-blurb';
import Reactions from './reactions';

function ReviewCard(props) {
  const {card, primaryRepoName} = props;
  const {repoOwner, repoName, number, id, bodyText, reactions, url} = card;

  const key = `${repoOwner}/${repoName}#${number}-${id}`;

  // comment updatedAt is updated when comment content is edited.
  // Note that the default `updatedAt` field of review comment
  // provided by GraphQL API is inaccurate. Thus, we use our custom
  // updatedAt, defined by `lastEditedAt` and `createdAt` time if never edited.
  const updatedAt = card.updatedAt;

  const user = card.author;
  const assignedAvatar = (
    <Link to={getFilters().toggleUserName(user.login).url()}>
      <img
        key='avatar'
        className='avatar-image'
        title={'Click to filter on ' + user.login}
        src={user.avatarUrl}/>
    </Link>
  );
  // stop highlighting after 5min
  const isUpdated = Date.now() - Date.parse(updatedAt) < 2 * 60 * 1000;

  // put the corresponding pull request as related card
  const issueCard = IssueStore.issueNumberToCard(repoOwner, repoName, number);
  const relatedCards = [issueCard].map((issueCard) => {
    let title;
    if (issueCard.issue) {
      title = (
        <span className='related-issue-title'>{issueCard.issue.title}</span>
      );
    }
    return (
      <div key={issueCard.key()} className='related-issue'>
        <IssueOrPullRequestBlurb
          card={issueCard}
          primaryRepoName={card.repoName}/>
        {title}
      </div>
    );
  });

  const classes = {
    'review': true,
    'is-updated': isUpdated,
  };

  const header = [
    <ReviewBlurb key='review-blurb'
      card={card}
      primaryRepoName={primaryRepoName} />,
  ];

  let reactionsStat = {
    THUMBS_UP: 0,
    THUMBS_DOWN: 0,
    LAUGH: 0,
    HOORAY: 0,
    HEART: 0,
    CONFUSED: 0
  };
  if (reactions) {
    reactions.forEach(reaction => reactionsStat[reaction.content]++);
  }

  return (
    <div className='-card-and-related'>
      <BS.ListGroupItem
        key={key}
        header={header}
        className={classnames(classes)}>

        <span className='-extra-span-for-inline-popover'>
          <a
            key='link'
            className='review-title'
            target='_blank'
            href={url}>
              <GithubFlavoredMarkdown
                inline
                repoOwner={repoOwner}
                repoName={repoName}
                text={bodyText}/>
          </a>
        </span>

        <span key='footer' className='review-footer'>
          <span key='left-footer' className='comment-reactions'>
            <Reactions stat={reactionsStat}/>
          </span>
          <span key='right-footer' className='review-time-and-user'>
            <Time key='time' className='updated-at' dateTime={updatedAt}/>
            {assignedAvatar}
          </span>
        </span>
      </BS.ListGroupItem>
      <div key='related' className='related-issues'>
        {relatedCards}
      </div>
    </div>
  );
}

function Review({review}) {
  return (
    <ReviewCard card={review}/>
  );
}

export default Review;
