import React from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { secondaryColor, brandWhite } from '~/lib/theme';
import { formatDatetimeShort } from '~/lib/moment';

// Record - 記録
// Reset - リセット
// Announce - 参加・大会開始・大会終了
// Topic - トピック投稿
// Text success - テキスト投稿(達成)
// Text analysis - テキスト投稿(分析)
// Text - テキスト投稿
// Media -メディア投稿

export const ChallengeNoteJoin = (props: any) => {
  const { startedAt } = props;
  return (
    <TimelineItem
      key="1"
      dateText={`${formatDatetimeShort(startedAt)} - Joined`}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会に参加しました。</p>
    </TimelineItem>
  );
};

export const ChallengeNoteOpen = (props: any) => {
  const openedAt: Date = props.openedAt;
  return (
    <TimelineItem
      key="2"
      dateText={formatDatetimeShort(openedAt) + ' - Opened'}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会がスタートしました。</p>
    </TimelineItem>
  );
};

export const ChallengeNoteClose = (props: any) => {
  const closedAt: Date = props.closedAt;

  return (
    <TimelineItem
      key="3"
      dateText={formatDatetimeShort(closedAt) + '- Closed'}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会が終了しました。</p>
    </TimelineItem>
  );
};

const ChallengeNote = (props: any) => {
  return null;
};

export default ChallengeNote;
