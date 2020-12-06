/// <reference types="cypress" />

import req from '../support/api/requests'
import asserions from '../support/api/assertions'

context('Ping', () => {
    it('validar que a aplicação está executando @healthcheck', () => {
        req.getPing().then(getPingResponse => {
            asserions.shouldHaveStatus(getPingResponse, 201)
        })
    })
})