export const interpolateScrollValue = (
  progress: number,
  input: number[],
  output: number[]
) => {
  if (progress <= input[0]!) return output[0]!;

  for (let index = 1; index < input.length; index += 1) {
    if (progress <= input[index]!) {
      const segmentProgress =
        (progress - input[index - 1]!) /
        (input[index]! - input[index - 1]!);

      return (
        output[index - 1]! +
        (output[index]! - output[index - 1]!) * segmentProgress
      );
    }
  }

  return output[output.length - 1]!;
};
