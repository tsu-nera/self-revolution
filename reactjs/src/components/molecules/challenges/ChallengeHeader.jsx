import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import theme from "../../../lib/theme";

const MainFeaturedPost = styled(Paper)`
  && {
    position: relative;
    background-color: ${theme.palette.grey[800]};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(4)};
    background-image: url(https://source.unsplash.com/user/erondu);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Overlay = styled.div`
  && {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const MainFeaturedPostContent = styled.div`
  && {
    position: relative;
    padding: ${theme.spacing(3)};
    @media (max-width: 960px) {
      padding: ${theme.spacing(6)};
      padding-right: 0;
    }
  }
`;

const ChallengeHeader = props => {
  const { challenge } = props;

  return (
    <MainFeaturedPost>
      <Overlay />
      <Grid container>
        <Grid item md={6}>
          <MainFeaturedPostContent>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {challenge.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {challenge.discription}
            </Typography>
          </MainFeaturedPostContent>
        </Grid>
      </Grid>
    </MainFeaturedPost>
  );
};

export default ChallengeHeader;
