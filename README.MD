# Guitar Pitch UI

hosted on https://lukehowkins.github.io/guitar-pitch-ui/

Uses [vexflow](http://www.vexflow.com/build/docs) for the rendering of musical notation
Creates a guitar fretboard manually using canvas
`MOCK_FLOW` can be set to `true` in `app.jsx` for keyboard input

## Local setup

requires node 18

`npm i`

`npm start`

http://localhost:5173/guitar-pitch-ui/

## Theory notes

A guitar is classed as a transposing instrument. The sounded/pitched note is an octave below the staved/display noted.
A standard guitar's range is E/2 pitch (E/3 staved) to E/6 (E/7 staved)

## TODO

- vitest is only unit, [integrate with RTL](https://www.robinwieruch.de/vitest-react-testing-library/)
- link MIDI/audio to game
- Selecting game
- Link to a Backend
