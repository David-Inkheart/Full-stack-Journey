'''
How to store an instance
'''


class Student():
    def __init__(self, name):
        self.name = name

students = []
students = reload()
s = Student("John")
students.append(s)
save(students)
