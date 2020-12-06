class Requests {
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping'
        })
    }

    getBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking/11'
        })
    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname" : "Med",
                "lastname" : "Brown",
                "totalprice" : 211,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-12-04",
                    "checkout" : "2020-12-05"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: `booking/${ id }`,
            body: {
                "firstname": "Jim",
                "lastname": "James Jr",
                "totalprice": 191,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-12-11",
                  "checkout": "2020-12-12"
                },
                "additionalneeds": "Breakfast"
              },
              failOnStatusCode: false
        })
    }

    updateBookingWithInvalidToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: `booking/${ id }`,
            headers: {
                Cookie: `token=${ Cypress.env(123)}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James Jr",
                "totalprice": 191,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-12-11",
                  "checkout": "2020-12-12"
                },
                "additionalneeds": "Breakfast"
              },
              failOnStatusCode: false
        })
    }

    updateNonExistentBooking(response) {
        const id = 1009
        return cy.request({
            method: 'PUT',
            url: `booking/${ id }`,
            headers: {
                Cookie: `token=${ Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James Jr",
                "totalprice": 191,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-12-11",
                  "checkout": "2020-12-12"
                },
                "additionalneeds": "Breakfast"
              },
              failOnStatusCode: false
        })
    }

    updateBooking(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${ Cypress.env('token') }`
            },
            body: {
                "firstname": "Jim Jam",
                "lastname": "James",
                "totalprice": 911,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                },
                "additionalneeds": "Lunch"
                },
                failOnStatusCode: false
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username" : "admin",
                "password" : "password123"
            },
            headers: { 'Content-Type': 'application/json', },
        })
    }

    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token
            Cypress.env('token', token)
        })
    }

    deleteBookingWithoutToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${ id }`,
            failOnStatusCode: false
        })
    }

    deleBookingInvalidToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${ id }`,
            headers: {
                Cookie: `token=${ Cypress.env(123)}`
            },
            failOnStatusCode: false
        })
    }

    deleteNonExistentBooking(response) {
        const id = 123
        return cy.request({
            method: 'DELETE',
            url: `booking/${ id }`,
            headers: {
                Cookie: `token=${ Cypress.env('token') }`
            },
            failOnStatusCode: false
        })
    }

    deleteBooking(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${ id }`,
            headers: {
                Cookie: `token=${ Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }
}

export default new Requests()