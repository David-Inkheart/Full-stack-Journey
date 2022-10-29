'''
using *args or **kwargs to pass arguments to a function
'''

'''
from test_var_kwargs import greet_me
from test_var_args import test_var_args
'''

def test_args_kwargs(arg1, arg2, arg3):
    print("arg1:", arg1)
    print("arg2:", arg2)
    print("arg3:", arg3)

'''
testing args
'''
test_args_kwargs("two", 3, 5)
print("---")
args = ("two", 3, 5)
test_args_kwargs(*args)
print("---")
kwargs = {"arg3": 3,"arg2": "two","arg1": 5}
test_args_kwargs(**kwargs)
