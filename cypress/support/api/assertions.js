class Assertions {
    shouldHaveStatus(response, status){
        expect(response.status, `Status ${ status }`).to.eq(status)
    }

    validateContractOf(response, schema){
        return cy.wrap(response.body).should(
            schema)
    }

    shouldBookingIdBePresent(response){
        expect(response.body.bookingid, 'Booking id exist').to.not.be.null
    }

    shouldHaveDefaultHeaders(response){
        expect(response.headers, 'Default headers').to.include(
            {
                server: 'Cowboy',
                connection: 'keep-alive',
                'x-powered-by':	'Express',
            }
        )
    }

    shouldHaveContentTypeAppJson(response) {
        expect(response.headers, 'Content type').to.include(
            {
                'content-type':'application/json; charset=utf-8'
            }
        )
    }

    shouldDurationBeFast(response) {
        expect(response.duration, 'Response duration').to.lt(1000)
    }

    shouldMessageInvalidMethod(response) {
        expect(response.body, 'Message bounced').to.eq('Method Not Allowed')
    }
}

export default new Assertions()