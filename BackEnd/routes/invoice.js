const express = require('express');
const app = express();
const Invoice = require('../models/invoice');

app.post('/', (req, res) => {
    let total = 0
    for (let i = 0; i < req.body.items.length; i++) {
        total += req.body.items[i].total
    }
    let invoice = new Invoice({
        invoiceNumber: req.body.invoiceNumber,
        client: req.body.client,
        billingDate: req.body.billingDate,
        paymentDate: req.body.paymentDate,
        items: req.body.items,
        total: total

    })

    console.log(invoice)

    invoice.save((err, invoice) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            mesage: 'invoice was created correctly',
            invoice: invoice
        });
    })
})

app.get('/', (req, res) => {
    Invoice.find({}).sort({
        name: 1
    }).exec((err, invoices) => {

        if (err) {
            return res.status(400).json({
                message: err
            })
        }

        res.status(200).json({
            invoices: invoices
        })

    })
})

app.get('/search/:param', (req, res) => {
    Invoice.find({
        "client.name": {
            $regex: req.params.param
        }
    }, (err, invoices) => {
        if (err) {
            return res.status(400).json({
                mesage: err
            })
        }
        res.status(200).json({
            invoices: invoices

        })
    })

})


app.get('/:id', (req, res) => {
    Invoice.findOne({
        _id: req.params.id
    }, (err, invoice) => {
        if (err) {
            // console.log(err)
            return res.status(400).json({
                message: err
            })
        }
        // console.log(invoice)
        res.status(200).json({
            invoice: invoice
        })
    })
})

app.put('/:_id', (req, res) => {


    console.log(req.body)
    let update = {};
    if (req.body.items !== undefined) {

        let total = 0
        for (let i = 0; i < req.body.items.length; i++) {
            total += req.body.items[i].quantity * req.body.items[i].unitPrice
        }
        update.items = req.body.items;
        update.total = total;

    }
    if (req.body.client !== undefined) {
        update.client = req.body.client;
    }

    if (req.body.billingDate !== undefined) {
        update.billingDate = req.body.billingDate;
    }
    if (req.body.paymentDate !== undefined) {
        update.paymentDate = req.body.paymentDate;
    }

    Invoice.findByIdAndUpdate({
        _id: req.params._id
    }, {
        $set: update
    }, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                message: err
            })
        }
        console.log('Done');
        console.log(update)
        res.status(200).json({
            message: `invoice ${result.name} has been updated`
        })
    })

})

app.delete('/:_id', (req, res) => {
    Invoice.deleteOne({
        invoiceNumber: req.params._id
    }, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: err
            })
        }
        res.status(200).json({
            message: `invoice ${result.name} has been deleted`
        })
    })
})


module.exports = app;