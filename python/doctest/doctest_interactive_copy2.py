def f(x):
    '''Backslashes in a raw docstring: m\\n''' 
print(f.__doc__)

def f(x):
    r'''Backslashes in a raw docstring: m\n'''
print(f.__doc__)


'''
>>> assert "Easy!"
      >>> import math
          >>> math.floor(1.9)
          1
'''
