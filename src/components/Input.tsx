import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControlProps as FormControlI,
  FormLabelProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  FormControlProps?: FormControlI;
  LabelProps?: FormLabelProps;
}

export function Input({
  name,
  label,
  FormControlProps,
  LabelProps,
  ...rest
}: InputProps): JSX.Element {
  return (
    <FormControl width="fit-content" {...FormControlProps}>
      {!!label && (
        <FormLabel htmlFor={name} {...LabelProps}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="green.500"
        variant="filled"
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
