import React from 'react';

import { Grid, Icon } from '@material-ui/core';
import styled from 'styled-components';
import Paper, { PaperProps } from '@material-ui/core/Paper';

import UserAvatar from '../atoms/UserAvatar';
import MuteButton from '~/web/containers/MuteButtonContainer';
import BlockButton from '~/web/containers/BlockButtonContainer';
import theme, { twitterColor, brandGray, brandWhite } from '~/lib/theme';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';
import { TITAN_TWITTER_URL } from '~/constants/appInfo';
import PostButton from '../atoms/PostButton';
import { formatYearDate } from '~/lib/moment';
import { getRandomImageURL } from '~/lib/url';
import TotalScoreBoard from '~/web/containers/TotalScoreBoardContainer';

const ProfileContent = styled.div`
  text-align: center;
`;

const MainFeaturedPost = styled(Paper)`
  && {
    position: relative;
    background-color: ${theme.palette.grey[800]};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(8)}px;
    background-image: url(${getRandomImageURL()});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
` as React.ComponentType<PaperProps>;

const ProfileHeader = (props: any) => {
  const { user, isLogin, isMyProfile } = props;

  return (
    <React.Fragment>
      <MainFeaturedPost>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            transform: 'translate3d(0, 50%, 0)'
          }}
        >
          <UserAvatar photoURL={user.photoURL} userId={user.shortId} xlarge />
        </div>
      </MainFeaturedPost>
      <Grid
        container
        justify="center"
        style={{ padding: 20, backgroundColor: brandWhite }}
      >
        <Grid item md={12}>
          <ProfileContent>
            <div>
              <h2>{user.displayName}</h2>
            </div>
            <div>
              {!!user.twitterUsername && (
                <NoStyledExternalLink href={TITAN_TWITTER_URL}>
                  <Icon
                    className="fab fa-twitter"
                    style={{ color: twitterColor }}
                  />
                </NoStyledExternalLink>
              )}
            </div>
            <div>
              {!!user.introduction && (
                <div>
                  <p>{user.introduction}</p>
                </div>
              )}
            </div>
            <TotalScoreBoard userShortId={user.shortId} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: brandGray
              }}
            >
              <p>{`登録日 ${formatYearDate(user.createdAt.toDate())}`}</p>
              <p style={{ marginLeft: 10 }}>{`最終更新日 ${formatYearDate(
                user.updatedAt.toDate()
              )}`}</p>
            </div>
            <div>
              {isLogin && !isMyProfile && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <MuteButton user={user} />
                  <BlockButton user={user} />
                </div>
              )}
            </div>
          </ProfileContent>
        </Grid>
        <Grid item md={12}>
          <div style={{ textAlign: 'right' }}>
            <PostButton
              to="/settings"
              type="button"
              text="プロフィールを編集"
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileHeader;
