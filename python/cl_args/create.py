#!/bin/python3
import glob
import sys

filename = sys.argv[1]
dir_list = glob.glob('*.py')

for i in dir_list:
    if filename == i:
        print("File already exits")
        break
    elif filename != i:
        open(sys.argv[1], "w+")
        break
