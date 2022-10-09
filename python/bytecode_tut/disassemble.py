# Tutorial in bytecode

from dis import dis


def relu(x):
    return x if x > 0 else 0

def relu_branchless(x):
    return(x > 0) * X

print(dis(relu))
print("")
print(dis(relu_branchless))


