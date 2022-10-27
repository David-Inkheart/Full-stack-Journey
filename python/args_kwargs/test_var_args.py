#!/usr/bin/python3
'''
*args is used to send a non-keyworded
variable length argument list to the function
'''


def test_var_args(f_arg, *argv):
    '''
    use first var passed to functions
    '''
    print("first normal arg:", f_arg)
    for arg in argv:
        '''
        use magic var to access other unknown args of unknown length.
        '''
        print("another arg though *argv:", arg)


test_var_args('yasoob', 'python', 'eggs', 'test')
