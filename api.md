---
description: 'Description of the API, Backend of our aplication'
---

# API

{% api-method method="get" host="http://localhost" path="/invoices/:id" %}
{% api-method-summary %}
Get invoices
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get free cakes.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" %}
ID of the invoice to get.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Invoice successfully retrieved.
{% endapi-method-response-example-description %}

```
{    "invoiceNumber": 111,    "client": {name:"Client Name","cif":"Tax Revenue ID","location":{"country":"Spain","province":"Madrid","city":"Madrid","address":"East side 22","postal":"28904"}},"billingDate":"Jan 1 2020","paymentDate":"jan 1 2020","items":[{"description":"item description","units":"Hours","quantity":1,"unitPrice":100.23,"tax":0,"total":100.23},"total":100,23]   
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
IInvoice cant be provided
{% endapi-method-response-example-description %}

```
{    "message": "DB error"}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



