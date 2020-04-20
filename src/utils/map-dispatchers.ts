import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

export const mapDispatchers = <T extends ActionCreatorsMapObject<AnyAction>>(actionCreators: T) => (
  dispatch: Dispatch<AnyAction>,
) => bindActionCreators<AnyAction, T>(actionCreators, dispatch);
