export const parseSelect2OptionName = item => {
  const option = item.slice(7);
  return option.charAt(0).toLowerCase() + option.slice(1);
};
