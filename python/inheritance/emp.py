from person import Person

class Emp(Person):

    def Print(self):
        print("Emp class called")


Emp_details = Emp('Mayana', 103)

'''can call Base class function'''
Emp_details.Display()

'''can call present class function'''
Emp_details.Print()
