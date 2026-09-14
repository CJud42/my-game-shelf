# My Game Shelf

A simple, responsive board-game collection website with:

- Search
- Player-count filtering
- Play-time filtering
- Difficulty filtering
- Tags
- Sorting
- Individual game detail views
- Embedded how-to-play videos

## Run it

Open `index.html` in a browser.

For local development, you can also run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Add your games

Open `app.js` and add another object to the `games` array. The fields are:

- `id`
- `name`
- `players: [minimum, maximum]`
- `time: [minimumMinutes, maximumMinutes]`
- `difficulty`
- `tags`
- `cover`
- `video` — a YouTube embed URL
- `rules`

## Important

The example cover images are remote demo images. For your real collection, replace them with your own game-box images or properly licensed images.

The example YouTube URLs are placeholders and should be replaced with the actual videos you want to embed.


## Uploaded cover photos
- Boss Monster: `assets/boss-monster.jpeg`
- Air, Land & Sea: Critters at War: `assets/air-land-sea-critters.jpeg`
- Dice Throne: still using the built-in placeholder until a box photo is added.
