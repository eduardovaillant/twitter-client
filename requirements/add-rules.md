# Add Rules

## Success:
1. ⛔️ Receive a **POST** request on **/api/tweets/rules**
2. ⛔️ Validate the obligatory field **rule**
3. ⛔️ Validate the optional field **tag** (if provided)
4. ⛔️ Calls the **Twitter API** with the correct data
5. ⛔️ Create a new rule with the Twitter API response
6. ⛔️ Returns 201 with the new rule

## Exceptions:
1. ⛔️ Returns 404 if the api doesn't exists
2. ⛔️ Returns 400 if **rule** is not provided
3. ⛔️ Returns 400 if **rule** or **tag** fails the validation
4. ⛔️ Returns 500 if the request to the Twitter API fails
5. ⛔️ Returns 500 if create rule fails