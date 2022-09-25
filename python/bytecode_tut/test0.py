# practice on reading bytecode
from dis import dis


def myfunc(alist):

    return len


print(dis(myfunc))
