const app = require('./app')
const request = require('supertest')

describe('App', () => {
    let server;
    
    beforeEach(() => {
        server = request(app)
    })

    it('should GET /health', async () => {
        const response = await server.get('/health')
        expect(response.status).toBe(200)
    })

    it('should serve content on GET /', async () => {
        const response = await server.get('/')
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toContain('text/html')
    })
})
