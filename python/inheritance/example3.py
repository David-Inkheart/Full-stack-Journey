'''Private members of a Base class are hidden
from subclasses'''


class C:
    def __init__(self):
        self.c = 21

        self.__d = 42


class D(C):
    def __init__(self):
        self.e = 84

        C.__init__(self)


object1 = D()


print(object1.d)
