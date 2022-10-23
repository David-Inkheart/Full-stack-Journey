from P import P

p1 = P(42)
p2 = P(4711)

print("p1 is: {}\np2 is: {}".format(p1.x, p2.x))

p1.x = 4
p2.x = 5
p1.x = p1.x * p2.x

print("new p1 is: {}\nnew p2 is: {}".format(p1.x, p2.x))
