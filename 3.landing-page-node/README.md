# Landing Page NodeJS Web Application
Web application with server-side rendering (SSR) dynamic templates using Jade.
## Getting Started
### Install **yarn** (If Not Installed Already)
```
npm i -g yarn
```

### Install This Project Dependencies
```
yarn install
```

### Add Mustache Template Engine
- First, have a look at: [Mustache Documentation](https://github.com/janl/mustache.js)
- Have a look at `src/app/app.js`: It configs Mustache as your view engine for your app. You can add new views and partial-views (templates) under `views/` folder, and serve them though new routes (and bind data to it 😬)