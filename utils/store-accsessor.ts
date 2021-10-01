import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import items from '~/store/items';
import toppings from '~/store/toppings';
import user from '~/store/user';
import cart from '~/store/cart';
import apiItems from '~/store/apiItems';

// eslint-disable-next-line import/no-mutable-exports
let ItemsStore: items;
let ToppingsStore: toppings;
let UserStore: user;
let CartStore: cart;
let ApiItemsStore: apiItems;

function initialiseStores(store: Store<any>): void {
  ItemsStore = getModule(items, store);
  ToppingsStore = getModule(toppings, store);
  UserStore = getModule(user, store);
  CartStore = getModule(cart, store);
  ApiItemsStore = getModule(apiItems, store);
}

export { initialiseStores,  ItemsStore, ToppingsStore, UserStore, CartStore, ApiItemsStore}