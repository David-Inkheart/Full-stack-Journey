#!/bin/python3

from setters import P

p1 = P(42)
p2 = P(4711)
a = p1.get_x()
b = p2.get_x()

print("p1 is: {}\np2 is: {}".format(a, b))

p1.set_x(47)
p1.set_x(p1.get_x()+p2.get_x())
a = p1.get_x()

print("new p1 is: {}\np2 is still: {}".format(a, b))
