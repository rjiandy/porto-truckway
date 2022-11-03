const defaultOption = {
  prefix: '',
  separator: '.'
};

export default function formatNumber(
  receivedInput,
  option = defaultOption
) {
  if (Number.parseInt(receivedInput) === isNaN) {
    return receivedInput;
  } else {
    let input = Math.round(receivedInput).toString();
    // eslint-disable-next-line prefer-destructuring
    input = input.split('.')[0];
    const { prefix, separator } = option;
    let result = '';
    let count = 0;
    if (input.length > 3) {
      for (let i = input.length - 1; i >= 0; i--) {
        result = input[i] + result;
        count += 1;
        if (count % 3 === 0 && count !== 0 && count !== input.length) {
          result = separator + result;
        }
      }
    } else {
      result = input;
    }
    result = prefix ? `${prefix} ${result}` : result;
    return result;
  }
}
