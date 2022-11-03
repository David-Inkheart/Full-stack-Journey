'''testing I/O examples

# sample test below
>>> print(a_character)
N
'''

with open('example.txt', 'r+', encoding='UTF-8') as a_file:
    a_file.seek(10)
    a_character = a_file.read(1)
    print(a_character + '\n')
    print("-----next answer-----")

    line_number = 0

    for line in a_file:
        line_number += 1
        print("{} : {}".format(line_number, line))
    print("-----next answer-----")

    line_number = 0
    a_file.seek(0)

    for line in a_file:
        line_number += 1
        print("{} : {}".format(line_number, line))
