const request = require('supertest')

const baseUrl = 'http://localhost:5000/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTMyODYzYWE1ODY2Zjc3ODRmYTk0MCIsImlhdCI6MTcxMzYxNzEzMywiZXhwIjoxNzE2MjA5MTMzfQ.eKIjTiW7wh9K_nXfAgL33p_lt1C8PKfySqBc0hQR4Oc';

describe("API testing for job", () => {
    it("should return all jobs", async () => {
        return request(baseUrl)
            .get('job')
            .set('Authorization',`Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
    it("should return job", async () => {
        return request(baseUrl)
            .get('job/662fb42cacb65a7efbc6f42f')
            .set('Authorization',`Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});