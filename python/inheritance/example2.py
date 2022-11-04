'''To demonstrate how parent constructors are called'''


class Person:

    def __init__(self, name, idnumber):
        self.name = name
        self.idnumber = idnumber

    def display(self):
        print(self.name)
        print(self.idnumber)


'''child class'''


class Employee(Person):
    def __init__(self, name, idnumber, salary, post):
        self.salary = salary
        self.post = post

        '''Invoking the __init__ of the parent class'''
        Person.__init__(self, name, idnumber)


'''an instance or object vatriable of child class'''
a = Employee('David', 886012, 200000, 'Intern')

'''call a function of Base class using an instance of Base class
created with subclass'''
a.display()
