## To Run Code:

-> Create account at https://www.themoviedb.org/account/signup

-> Create an API-KEY from https://www.themoviedb.org/settings/api

-> Set API-KEY as environment variable as below

-> Command prompt `set "REACT_APP_MOVIE_DATABASE_API_KEY = YOUR_API_KEY" && NPM START` to start the server

-> That's it to get on running the code

## To Test Code:

-> You can view the upcoming latest movies on home page and on clicking on a movie it will navigate to movie detail page

-> Implemented infinite scrolling, test it by scrolling the page to the bottom

-> Search any movie on the search input to get the desired results

-> Test the responsiveness of page by changing the window size

## Things That I Did Well:

### Managing state by using react-redux state management library:

Passing state between components is complex in react. By using react-redux, it can be made easy by the use of redux global store to store the state of the component and can
access them for any child component.

### Responsiveness of the page:

Using Grid columns with auto fill and min-max will have a responsive page of movie cards.

### Handling of asynchronous API calls by using redux-thunk:

In redux, when an action creator returns a function, it function will get executed by the Redux Thunk middleware. This function doesn't need to be pure, it is thus allowed to have side effects, including executing asynchronous API calls and function can also dispatch actions.

### If I had more time:

I would improve the state management and improve response of the page.
