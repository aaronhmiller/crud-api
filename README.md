# crud-api
Demo of Deno, the Oak framework, and KV to create a RESTful API

### Background

Used [this tutorial](https://deno.com/blog/build-crud-api-oak-denokv) to create the API.

### Usage

* Create
  * `http :8000/users id=1 name=foo email=foo@deno.com password=123456`
  * `http :8000/users/1/address city='Mountain View' street='Main Street'`
* Retrieve
  * `http :8000/users`
  * `http :8000/users/1/address`
* Update
  * `http :8000/users id=1 name=bar email=bar@deno.com password=7890`
  * `http :8000/users/1/address city='New York' street='Broadway'`
* Delete
  * `http delete :8000/users/1`
