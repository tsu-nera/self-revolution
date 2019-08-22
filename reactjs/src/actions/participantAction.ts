import {
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  FETCH_PARTICIPANTS_ERROR,
  FETCH_PARTICIPANT_REQUEST,
  FETCH_PARTICIPANT_SUCCESS,
  FETCH_PARTICIPANT_ERROR
} from '../constants/actionTypes';

import {
  fetchTarget,
  fetchItems,
  fetchRequest,
  fetchSuccess,
  fetchError
} from './actionUtil';

export const fetchParticipantsRequest = fetchRequest(
  FETCH_PARTICIPANTS_REQUEST
);
export const fetchParticipantsSuccess = fetchSuccess(
  FETCH_PARTICIPANTS_SUCCESS
);
export const fetchParticipantsError = fetchError(FETCH_PARTICIPANTS_ERROR);
export const fetchParticipantRequest = fetchRequest(FETCH_PARTICIPANT_REQUEST);
export const fetchParticipantSuccess = fetchSuccess(FETCH_PARTICIPANT_SUCCESS);
export const fetchParticipantError = fetchError(FETCH_PARTICIPANT_ERROR);

export const fetchParticipants = (resourceId: string) => {
  return fetchItems(
    resourceId,
    fetchParticipantsRequest,
    fetchParticipantsSuccess,
    fetchParticipantsError
  );
};

export const fetchParticipant = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchParticipantRequest,
    fetchParticipantSuccess,
    fetchParticipantError
  );
};
