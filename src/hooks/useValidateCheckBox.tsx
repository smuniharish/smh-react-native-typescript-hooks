import { useEffect } from 'react';
import { useDefaultReducer } from 'react-form-validate-hooks';
interface optionsInterfaceCheckBox {
  isRequired: boolean;
  value: boolean;
  validError?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  disabled?: boolean;
  onChangeCallBack?: boolean;
}
const initialState = {
  isChecked: false,
  isValid: true,
  customError: null,
  color: null,
};
const useValidateCheckBox = (options: optionsInterfaceCheckBox) => {
  options.checkedColor = options.checkedColor || '#000000';
  options.uncheckedColor = options.uncheckedColor || '#a8a8a8';
  options.value = options.value || false;
  options.validError = options.validError || 'Please tick checkbox !!!';
  const { state, multipleAction } = useDefaultReducer(initialState);
  const {
    isRequired,
    checkedColor,
    uncheckedColor,
    disabled,
    onChangeCallBack,
    value,
    validError,
  } = options;
  const { isChecked, isValid, customError, color } = state;
  useEffect(() => {
    if (isRequired) {
      if (value) {
        multipleAction({ isValid: true, customError: null });
      } else {
        multipleAction({ isValid: false, customError: validError });
      }
    }
  }, [isRequired]);
  useEffect(() => {
    if (isRequired) {
      if (isChecked) {
        multipleAction({
          color: checkedColor,
          isChecked: true,
          isValid: true,
          customError: null,
        });
      } else {
        multipleAction({
          color: uncheckedColor,
          isChecked: false,
          isValid: false,
          customError: validError,
        });
      }
    } else {
      if (isChecked) {
        multipleAction({ color: checkedColor, isChecked: true });
      } else {
        multipleAction({ color: uncheckedColor, isChecked: false });
      }
    }
  }, [isChecked]);
  const onValueChangeHandler = () => {
    multipleAction({ isChecked: !isChecked });
  };
  const reset = () => {
    multipleAction(initialState);
  };
  const hasError = !isValid;
  const result = {
    color: color,
    inputIsDisabled: disabled,
    onChangeCallBack: onChangeCallBack,
    onValueChangeHandler: onValueChangeHandler,
    value: isChecked,
    isValid: isValid,
    customError: customError,
    hasError: hasError,
    reset: reset,
  };
  // console.log('result', result);
  return result;
};

export default useValidateCheckBox;