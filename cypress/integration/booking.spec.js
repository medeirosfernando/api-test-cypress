/// <reference types="cypress" />

import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Bookink', () => {

    before(() => {
        req.doAuth()
    })

    it('validar contrato do GET Booking @contract', () => {

        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf
            (
                getBookingResponse, 
                schemas.getBookingSchema()
            )
        })
    })

    it('criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse,200)
            assertions.shouldBookingIdBePresent(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDurationBeFast(postBookingResponse)           
        })
    })

    it('tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
            })
        })
    })

    it('tentar alterar uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithInvalidToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
            })
        })
    })

    it('tentar alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateNonExistentBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 405)
                assertions.shouldMessageInvalidMethod(putBookingResponse)
            })
        })
    })

    it('alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
            })
        })        
    })

    it('tentar excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
            })
        })
    })

    it('tentar excluir uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleBookingInvalidToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
            })
        })
    })
    
    it('tentar excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteNonExistentBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 405)
                assertions.shouldMessageInvalidMethod(deleteBookingResponse)
            })
        })
    })

    it('excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
            })            
        })        
    })
})
