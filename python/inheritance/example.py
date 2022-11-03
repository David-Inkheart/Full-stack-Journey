'''
A programm to demonstrate inheritance

Person is Base or Super class

Object can be put in bracket as the Base of the Base class
i.e an ancestor of all classes, but in python 3.x, "class Person"
is equivalent to "class Person(object)"
'''


class Person:

    def __init__(self, name):
        self.name = name

    def getNAme(self):
        return self.name

    '''To check if this is an employee'''
    def isEmployee(self):
        return False


'''
Inherited or Subclass
'''


class Employee(Person):

    '''This is an employee'''
    def isEmployee(self):
        return True


''' An object of Person'''
emp = Person("David1")
print(emp.getNAme(), emp.isEmployee())

'''An object of Employee'''
emp = Employee("David2")
print(emp.getNAme(), emp.isEmployee())
