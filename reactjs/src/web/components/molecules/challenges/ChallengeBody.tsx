import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChallengeUserDashBoard from '~/web/containers/challenges/ChallengeUserDashBoardContainer';

import Topics from '~/web/containers/TopicsContainer';
import ChallengeTimeline from '~/web/containers/challenges/ChallengeTimelineContainer';
import Topic from '~/web/containers/TopicContainer';

import ChallengeLeaderBoard from '~/web/containers/challenges/ChallengeLeaderBoardContainer';
import TopicForm from '~/web/containers/TopicFormContainer';
import MarkdownView from '../../atoms/MarkdownView';
import ChallengeOverview from './ChallengeOverview';
import ChallengeUserSettings from '~/web/containers/challenges/ChallengeUserSettingsContainer';
import ChallengeGoals from '~/web/containers/challenges/ChallengeGoalsContainer';
import ChallengeGoal from '~/web/containers/challenges/ChallengeGoalContainer';
import ChallengeActivities from '~/web/containers/challenges/ChallengeActivitiesContainer';
import ChallengeObjectiveForm from '~/web/containers/challenges/ChallengeObjectiveFormContainer';

import Flag from '~/web/containers/FlagContainer';

const ChallengeBody = (props: any) => {
  const { challenge } = props;

  return (
    <Switch>
      <Route
        path="/c/:id/overview"
        render={props => (
          <ChallengeOverview
            challenge={challenge}
            text={challenge.overview}
            youtubeId={challenge.youtubeId}
            openedAt={challenge.openedAt.toDate()}
            closedAt={challenge.closedAt.toDate()}
            {...props}
          />
        )}
      />
      <Route
        path="/c/:id/timeline"
        render={props => <ChallengeTimeline challenge={challenge} {...props} />}
      />
      <Route
        path="/c/:collectionId/t/:topicId/edit"
        render={props => <TopicForm collection="challenges" {...props} />}
      />
      <Route
        path="/c/:collectionId/t/new"
        render={props => <TopicForm collection="challenges" {...props} />}
      />
      <Route
        path="/c/:collectionId/t/:topicId"
        render={props => <Topic collection="challenges" {...props} />}
      />
      <Route
        path="/c/:id/topics"
        render={props => (
          <Topics
            collection="challenges"
            collectionId={challenge.id}
            {...props}
          />
        )}
      />
      <Route
        path="/c/:id/rules"
        render={() => (
          <React.Fragment>
            <MarkdownView text={challenge.rules} />
            <Flag challenge={challenge} />
          </React.Fragment>
        )}
      />
      <Route
        path="/c/:id/leaderboard"
        render={props => (
          <ChallengeLeaderBoard challengeId={challenge.id} {...props} />
        )}
      />
      <Route
        path="/c/:id/goals"
        render={props => (
          <ChallengeGoals challengeId={challenge.id} {...props} />
        )}
      />
      <Route
        path="/c/:id/u/:userShortId/activities"
        render={props => (
          <ChallengeActivities challenge={challenge} {...props} />
        )}
      />
      <Route
        path="/c/:id/u/:userShortId/goal/edit"
        render={props => (
          <ChallengeObjectiveForm challenge={challenge} {...props} />
        )}
      />
      <Route
        path="/c/:id/u/:userShortId/goal"
        render={props => <ChallengeGoal challenge={challenge} {...props} />}
      />
      <Route
        path="/c/:id/u/:userShortId/settings"
        render={props => (
          <ChallengeUserSettings challengeId={challenge.id} {...props} />
        )}
      />
      <Route
        path="/c/:id/u/:userShortId"
        render={(props: any) => (
          <ChallengeUserDashBoard challenge={challenge} {...props} />
        )}
      />
    </Switch>
  );
};

export default ChallengeBody;
