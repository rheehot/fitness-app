import { Exercise } from 'modules/routine';
import { useReducer, useCallback } from 'react';

type State = {
  category: string;
  selected: Exercise | null;
  inputs: {
    weight: number;
    numberOfTimes: number;
    numberOfSets: number;
  };
  alertVisible: boolean;
  alertText: string;
};

type Action =
  | { type: 'SET_CATEGORY' | 'SET_ALERT_TEXT'; payload: string }
  | { type: 'SET_SELECTED'; payload: Exercise | null }
  | { type: 'TOGGLE_ALERT'; payload: boolean }
  | {
      type: 'CHANGE_WEIGHT' | 'CHANGE_NUM_OF_TIMES' | 'CHANGE_NUM_OF_SETS';
      payload: number;
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_SELECTED':
      return { ...state, selected: action.payload };
    case 'CHANGE_WEIGHT':
      return { ...state, inputs: { ...state.inputs, weight: action.payload } };
    case 'CHANGE_NUM_OF_TIMES':
      return {
        ...state,
        inputs: { ...state.inputs, numberOfTimes: action.payload },
      };
    case 'CHANGE_NUM_OF_SETS':
      return {
        ...state,
        inputs: { ...state.inputs, numberOfSets: action.payload },
      };
    case 'TOGGLE_ALERT':
      return { ...state, alertVisible: action.payload };
    case 'SET_ALERT_TEXT':
      return { ...state, alertText: action.payload };
    default:
      return state;
  }
};

const useAddExercise = () => {
  const [state, dispatch] = useReducer(reducer, {
    category: 'all',
    selected: null,
    inputs: {
      weight: 0,
      numberOfTimes: 0,
      numberOfSets: 0,
    },
    alertVisible: false,
    alertText: '',
  });

  const onSelectExercise = useCallback(
    (exercise: Exercise) =>
      dispatch({ type: 'SET_SELECTED', payload: exercise }),
    [],
  );

  const onChangeInput = useCallback(
    (
      type: 'CHANGE_WEIGHT' | 'CHANGE_NUM_OF_TIMES' | 'CHANGE_NUM_OF_SETS',
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (e.target.value.length > 3) return;
      dispatch({
        type,
        payload: +e.target.value,
      });
    },
    [],
  );

  const onSetCategory = useCallback(
    (str: string) => dispatch({ type: 'SET_CATEGORY', payload: str }),
    [],
  );

  const onCheckInputs = useCallback(() => {
    if (!state.selected) {
      dispatch({ type: 'SET_ALERT_TEXT', payload: '운동 종류를 선택하세요.' });
      onAlert();
      return false;
    }
    if (
      !state.inputs.weight ||
      !state.inputs.numberOfTimes ||
      !state.inputs.numberOfSets
    ) {
      dispatch({ type: 'SET_ALERT_TEXT', payload: '정확한 값을 입력하세요.' });
      onAlert();
      return false;
    }
    if (state.inputs.numberOfSets > 20) {
      dispatch({ type: 'SET_ALERT_TEXT', payload: '최대 세트 수는 20입니다.' });
      onAlert();
      return false;
    }
    return true;
  }, [state.selected, state.inputs]);

  const onAlert = useCallback(() => {
    dispatch({ type: 'TOGGLE_ALERT', payload: true });
    setTimeout(() => dispatch({ type: 'TOGGLE_ALERT', payload: false }), 2000);
  }, []);

  return {
    addState: state,
    onSetCategory,
    onSelectExercise,
    onChangeInput,
    onCheckInputs,
    onAlert,
  };
};

export default useAddExercise;
