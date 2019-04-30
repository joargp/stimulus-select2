export let parseSelect2OptionName = (item) => {
  item = item.slice(7);
  return item.charAt(0).toLowerCase() + item.slice(1);
};
