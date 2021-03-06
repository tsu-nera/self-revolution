import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const SquareWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const notAchievedColor = '#ffcdd2';
const achievedColor = '#ff5252';

const Square = styled.button`
  margin: 1px;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 5px;
  background-color: ${props => props.color};
`;

const ChallengeGrass = (props: any) => {
  const openedAt = moment(props.openedAt.toDate());
  const closedAt = moment(props.closedAt.toDate());
  const duration: number = closedAt.diff(openedAt, 'days') + 1;

  const totalDays = [...Array(duration).keys()].map(i => false);

  const { histories } = props;
  histories.forEach((history: any) => {
    const timestamp = moment(history.timestamp.toDate());
    const index = timestamp.diff(openedAt, 'days');
    totalDays[index] = true;
  });

  return (
    <SquareWrapper>
      {Object.entries(totalDays).map((value, _) => (
        <Square
          key={value[0]}
          color={value[1] ? achievedColor : notAchievedColor}
        />
      ))}
    </SquareWrapper>
  );
};

export default ChallengeGrass;
