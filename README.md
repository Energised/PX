# picross

Third times the charm


## Notes to Self

- Row hints ALWAYS have preceeding 0's
- This could be configured when loading from DB or just stored/loaded that way to ensure matching length arrays

- Next Step - write a ts class that can:

    - Generate a random board state
    - Generate the hints that go along with it
    - Return that as a class along with all the values needed
    - these can be passed into the Board component which will render everything and make it usable

- Then generate a way to detect the win condition
    - Add a little animation and message when the user has completed it
    - Add a regenerate picross puzzle button
    - Loop will start all over again

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
