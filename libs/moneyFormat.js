const formatMoney = (a) => {
  return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
};

export default formatMoney;
