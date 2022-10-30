try:
    num1, num2 = input("Enter 2 values to divide : ").split()

except (ValueError, NameError):
    print("\nPlease input exactly two numbers\n")

try:
    quotient = int(num1) / int(num2)

    print("{} / {} = {}".format(num1, num2, quotient))

except (NameError):
    print("\nPlease input exactly two numbers\n")

except ZeroDivisionError:
    print("\nYou can't divide by zero\n")

except ValueError:
    print("\nPlease input numbers only\n")

else:
    print("\nYou didn't raise an exception\n")

finally:
    print("\nI execute no matter what\n")
