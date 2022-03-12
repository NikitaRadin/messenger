from random import randint
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import EmailMessage


digits_number = 6


def generate_code():
    code = ''.join(str(randint(0, 9)) for _ in range(digits_number))
    return code


def validate_code(code):
    return len(code) == digits_number and code.isdigit()


class CodeValidationException(Exception):
    pass


def set_and_send_code(user, code):
    if not validate_code(code):
        raise CodeValidationException
    encrypted_code = make_password(code)
    user.authenticationcode.encrypted_code = encrypted_code
    user.authenticationcode.save()
    email_message = EmailMessage(subject='Authentication code',
                                 body=f'Authentication code: {code}',
                                 to=[user.email])
    email_message.send()


def check_code(user, code):
    encrypted_code = user.authenticationcode.encrypted_code
    if check_password(code, encrypted_code):
        user.authenticationcode.encrypted_code = ''
        user.authenticationcode.save()
        return True
    return False
