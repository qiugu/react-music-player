enum MUSIC_STATUS {
  PLAY,
  DEL,
  NEXT,
  PREV,
  CHANGE
};

interface ActionType {
  type: string;
}

const initState = MUSIC_STATUS.PLAY;

function reducer(state = initState, action: ActionType) {
  switch (action.type) {
    case 'PLAY_MUSIC':
      return MUSIC_STATUS.PLAY;
    case 'DEL_MUSIC':
      return MUSIC_STATUS.DEL;
    case 'PLAY_NEXT':
      return MUSIC_STATUS.NEXT;
    case 'PLAY_PREV':
      return MUSIC_STATUS.PREV;
    case 'CHANGE_REPEAT':
      return MUSIC_STATUS.CHANGE;
    default:
      return initState;
  }
}

export default reducer;
