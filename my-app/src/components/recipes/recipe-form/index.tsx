import { Route } from 'react-router';
import * as React from 'react';
import { RecipeForm } from './RecipeForm';

export default () => {
    return <React.Fragment>
        <Route path='/recipes/add' component={RecipeForm} />
        <Route path='/recipes/edit/:id' component={RecipeForm} />
    </React.Fragment>;
}