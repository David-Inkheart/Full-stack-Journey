#!/usr/bin/python3
'''
**kwargs is used to pass keyworded
variable length arguments to a function
'''


def greet_me(**kwargs):
    '''
    handles named arguments in a function
    '''
    if kwargs is not None:
        for key, value in kwargs.items():
                print("{:s} == {:s}".format(key, value))


greet_me(name='yasoob')
