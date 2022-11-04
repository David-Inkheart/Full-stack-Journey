#!/usr/bin/python3
import datetime

class Employee:

    num_of_emps = 0
    raise_amt = 1.04

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.email = first + '.' + last + '@email.com'
        self.pay = pay

        Employee.num_of_emps += 1

    def fullname(self):
        return '{} {}'.format(self.first, self.last)

    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amt)

    '''classmethod takes in cls instead of self'''
    @classmethod
    def set_raise_amt(cls, amount):
        cls.raise_amt = amount

    '''classmethod used as a constructor to parse string input'''
    @classmethod
    def from_string(cls, emp_str):
        first, last, pay = emp_str.split('-')
        return cls(first, last, pay)

    '''staticmethod does not take self or cls as first argument
    it is usually used when there a logical connection to the class
    or instance but does not access their attributes or methods'''
    @staticmethod
    def is_workday(day):
        '''in python, for weekday() module, 0 - 6 reads Monday - Sunday'''
        if day.weekday() == 5 or day.weekday() == 6:
            return False
        return True
        
emp_1 = Employee('Corey', 'Schafer', 50000)
emp_2 = Employee('David', 'Okolie', 60000)

my_date = datetime.date(2016, 7, 11)

print(Employee.is_workday(my_date))

#print(new_emp_1.email)
#print(new_emp_1.pay)
