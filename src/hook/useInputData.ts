import {
  createContext,
  Dispatch,
  DispatchWithoutAction,
  useReducer,
  useState,
} from "react";
import Profile from "../model/profile";

type InputData = Pick<Profile, "email" | "phone">;

type InputDataModalCtx = {
  hide: DispatchWithoutAction;
  show: DispatchWithoutAction;
  onChange: Dispatch<Partial<InputData>>;
  showing: boolean;
  data: InputData;
};

export const InputDataModal = createContext<InputDataModalCtx>({
  show: () => {},
  hide: () => {},
  data: {},
  showing: false,
  onChange: () => {},
});

export default function useInputData(): InputDataModalCtx {
  const [showing, setShowInputModal] = useState(false);
  const [data, onChange] = useReducer(
    (state: InputData, action: Partial<InputData>) => ({
      ...state,
      ...action,
    }),
    {}
  );
  return {
    hide: () => setShowInputModal(false),
    show: () => setShowInputModal(true),
    data,
    onChange,
    showing,
  };
}
