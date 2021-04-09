import { remove } from "js-cookie";
import { getCookie, setCookie } from "../../libs/useCookie";
import { actionShopping } from "./action";
const CARD = "CARD";

const shopInitialState = {
  shopping: getCookie(CARD),
};

function clear() {
  let shoppings = [];
  setCookie(CARD, shoppings);
  return shoppings;
}

function removeShoppingCart(data) {
  let shoppings = shopInitialState.shopping;
  shoppings = shoppings.filter((item) => item.product._id !== data.product._id);
  shopInitialState.shopping = shoppings;
  setCookie(CARD, shoppings);
  return shoppings;
}

function increment(data) {
  let shoppings = shopInitialState.shopping;
  let isExisted = shoppings.some(
    (item) => item.product._id === data.product._id
  );
  if (isExisted) {
    shoppings.forEach((item) => {
      if (item.product._id === data.product._id) {
        item.quantity += 1;
      }
      return item;
    });
  }
  setCookie(CARD, shoppings);
  return shoppings;
}

function decrement(data) {
  let shoppings = shopInitialState.shopping;
  let isExisted = shoppings.some(
    (item) => item.product._id === data.product._id
  );
  if (isExisted) {
    shoppings.forEach((item) => {
      if (item.quantity > 1) {
        if (item.product._id === data.product._id) {
          item.quantity -= 1;
        }
      }
      return item;
    });
  }
  setCookie(CARD, shoppings);
  return shoppings;
}

function getShopping() {
  return getCookie(CARD);
}

function addShoppingCart(data) {
  let shoppings = shopInitialState.shopping;
  let isExisted = shoppings.some(
    (item) => item.product._id === data.product._id
  );
  if (isExisted) {
    shoppings.forEach((item) => {
      if (item.product._id === data.product._id) {
        item.quantity += 1;
      }
      return item;
    });
  } else {
    shoppings.push(data);
  }
  setCookie(CARD, shoppings);
  return shoppings;
}

export default function reducer(state = shopInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionShopping.ADD:
      state = {
        shopping: addShoppingCart(payload),
      };
      return state;
    case actionShopping.CLEAR:
      state = {
        shopping: clear(),
      };
      return state;
    case actionShopping.INCREMENT:
      state = {
        shopping: increment(payload),
      };
      return state;
    case actionShopping.DECREMENT:
      state = {
        shopping: decrement(payload),
      };
      return state;
    case actionShopping.REMOVE:
      state = {
        shopping: removeShoppingCart(payload),
      };
      return state;
    case actionShopping.GET:
    case actionShopping.FETCH:
    default:
      state = {
        shopping: getShopping(),
      };
      return state;
  }
}
