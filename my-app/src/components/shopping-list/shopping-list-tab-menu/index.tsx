import { Route } from 'react-router';
import * as React from 'react';
import ShoppingListTabMenu from './ShoppingListTabMenu';

export default () => {
    return <Route path='/shoppingList' component={ShoppingListTabMenu} />;
}