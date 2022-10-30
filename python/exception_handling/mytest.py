try:
    fileContent =  open("mydata3.txt")

except FileNotFoundError as ex:
    print("File does not exist")

    print(ex.args)

else:
    print("File :\n", fileContent.read())
    fileContent.close()

finally:
    print("Finished working with file")
