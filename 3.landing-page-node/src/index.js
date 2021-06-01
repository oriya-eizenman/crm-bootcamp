require('dotenv-flow').config()
const app = require('./app')
const path = require('path')
const package_json = require(path.resolve('package.json'))

const start_time = Date.now()

async function bootstrap() {
    app.listen(process.env.PORT, () => {
        console.log(package_json.name, `running on http://localhost:${process.env.PORT}`, process.env.NODE_ENV)
    })

    return app;
}

bootstrap()
    .then(() => {
        console.log(`🚀 Application bootstrapped in ${((Date.now() - start_time) / 1e3).toFixed(3)}s`)
    })
    .catch(console.error)