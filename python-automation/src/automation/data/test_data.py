class Users:
    STANDARD_USERNAME = "standard_user"
    STANDARD_PASSWORD = "secret_sauce"
    LOCKED_USERNAME = "locked_out_user"
    LOCKED_PASSWORD = "secret_sauce"
    INVALID_USERNAME = "invalid_user"
    INVALID_PASSWORD = "wrong_password"


class Urls:
    BASE = "https://www.saucedemo.com"
    INVENTORY = "https://www.saucedemo.com/inventory.html"
    CART = "https://www.saucedemo.com/cart.html"
    CHECKOUT_STEP_1 = "https://www.saucedemo.com/checkout-step-one.html"
    CHECKOUT_STEP_2 = "https://www.saucedemo.com/checkout-step-two.html"
    CHECKOUT_COMPLETE = "https://www.saucedemo.com/checkout-complete.html"


class ErrorMessages:
    LOCKED_OUT = "Epic sadface: Sorry, this user has been locked out."
    INVALID_CREDENTIALS = "Epic sadface: Username and password do not match any user in this service"
    MISSING_USERNAME = "Epic sadface: Username is required"
    MISSING_PASSWORD = "Epic sadface: Password is required"


class CustomerData:
    FIRST_NAME = "Test"
    LAST_NAME = "User"
    POSTAL_CODE = "12345"
