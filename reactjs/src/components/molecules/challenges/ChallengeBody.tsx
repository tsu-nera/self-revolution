import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import ChallengeOverview from './ChallengeOverview';
import ChallengeTopics from './ChallengeTopics';
import ChallengeRules from './ChallengeRules';
import ChallengePosts from './ChallengePosts';
import ChallengeTimeline from './ChallengeTimeline';
import Topic from '../Topic';

import theme from '../../../lib/theme';
import ChallengeLeaderBoard from './ChallengeLeaderBoard';
import TopicForm from '../TopicForm';

const ChallengeContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const ChallengeBody = (props: any) => {
  const { challenge } = props;

  return (
    <ChallengeContent>
      <Switch>
        <Route
          path="/challenges/:id/overview"
          render={() => <ChallengeOverview text={challenge.overview} />}
        />
        <Route
          path="/challenges/:id/timeline"
          render={() => <ChallengeTimeline channelId={challenge.channelId} />}
        />
        <Route
          path="/challenges/:collectionId/topics/:topicId/edit"
          render={match => <TopicForm collection="challenges" match={match} />}
        />
        <Route
          path="/challenges/:collectionId/topics/new"
          render={match => <TopicForm collection="challenges" match={match} />}
        />
        <Route
          path="/challenges/:collectionId/topics/:topicId"
          render={props => <Topic collection="challenges" props={props} />}
        />
        <Route path="/challenges/:id/topics" component={ChallengeTopics} />
        <Route
          path="/challenges/:id/rules"
          render={() => <ChallengeRules text={challenge.rules} />}
        />
        <Route
          path="/challenges/:id/leaderboard"
          component={ChallengeLeaderBoard}
        />
        <Route
          path="/challenges/:id/posts"
          render={(props: any) => (
            <ChallengePosts
              webhookURL={challenge.webhookURL}
              openedAt={challenge.openedAt}
              closedAt={challenge.closedAt}
              {...props}
            />
          )}
        />
      </Switch>
    </ChallengeContent>
  );
};

export default ChallengeBody;
