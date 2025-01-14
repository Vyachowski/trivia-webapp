import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { ROUND_TIME } from '@/config';
import { GameStates, ModalTypes } from '@/types/types';

// SECTION: SLICES
export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    name: undefined as string | undefined,
    score: '0',
  },
  reducers: {
    setPlayerName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPlayerScore(state, action: PayloadAction<string>) {
      state.score = action.payload;
    },
    resetPlayerScore(state) {
      state.score = '0';
    },
  },
});

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visible: false,
    type: null as ModalTypes | null,
  },
  reducers: {
    openUserModal(state) {
      state.type = ModalTypes.userName;
      state.visible = true;
    },
    openLostModal(state) {
      state.type = ModalTypes.lost;
      state.visible = true;
    },
    openWinModal(state) {
      state.type = ModalTypes.lost;
      state.visible = true;
    },
    closeModal(state) {
      state.visible = false;
      state.type = null;
    },
  },
});

const roundSlice = createSlice({
  name: 'round',
  initialState: {
    count: 0,
    timeLeft: ROUND_TIME,
  },
  reducers: {
    tick(state) {
      state.timeLeft -= 1;
    },
    startNewRound(state) {
      state.count += 1;
      state.timeLeft = ROUND_TIME;
    },
    resetProgress(state) {
      state.count = 0;
      state.timeLeft = ROUND_TIME;
    },
  },
});

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    state: null as null | GameStates,
  },
  reducers: {
    setStartStatus(state) {
      state.state = GameStates.Start;
    },
    setWinStatus(state) {
      state.state = GameStates.Win;
    },
    setLostStatus(state) {
      state.state = GameStates.Lost;
    },
  },
});

// SECTION: ACTIONS
export const { setStartStatus, setWinStatus, setLostStatus } =
  gameSlice.actions;
export const { setPlayerName, setPlayerScore, resetPlayerScore } =
  playerSlice.actions;
export const { startNewRound, tick, resetProgress } = roundSlice.actions;
export const { openUserModal, openWinModal, openLostModal, closeModal } =
  modalSlice.actions;

// SECTION: REDUCERS
export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    player: playerSlice.reducer,
    round: roundSlice.reducer,
    modal: modalSlice.reducer,
  },
});

// SECTION: EXPORT
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
