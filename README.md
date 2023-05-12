Chess app, for fun.

⚠️ This won't work right now! Heroku recently removed its free tier, so the backend is not currently operational. At some point, I'll move this over to render.com. They were always better anyway.

## Monorepo Breakdown
| Codebase            | Description     | Deploy Status
|---------------------|-----------------|---------------
| [morphy](morphy/)   | React frontend  | [![Netlify Status](https://api.netlify.com/api/v1/badges/e760f374-7e56-4987-83bb-c5777633c92e/deploy-status)](https://app.netlify.com/sites/briancldo-chess/deploys)
| [fischer](fischer/) | Node.js backend |
| [carlsen](carlsen/) | E2E tests       | NA
| [arbiter](arbiter/) | Meta tests      | NA

Note: if you want to test "challenge" feature, I would recommend using two different devices. Chrome has recently changed the behavior of window prompts - they don't appear when the browser isn't in the forefront.
