#!/usr/bin/env python3

'''
simple test console to test out features of
Airbnb clone being built
also includes a basic record and playback
facility implemented with the precmd()
'''

import cmd
import sys

'''from <file for actual commands> import *'''


class Hbnb(cmd.Cmd):
    intro = 'Welcome to the hbnb console. \
Type help or ? to list commands.\n'
    prompt = '(hbnb) '
    file = None

    '''-------basic console commands------'''

    def do_EOF(self, arg):
        '''Clear the screen and return to prompt:  EOF'''
        pass

    def do_create(self, arg):
        '''creates a new object: CREATE'''
        pass

    def do_update(self, arg):
        '''updates an object: UPDATE'''
        pass

    def do_delete(self, arg):
        '''deletes an object: DELETE'''
        pass

    def do_save(self, arg):
        '''saves an object to storage: SAVE'''
        pass

    def do_quit(self, arg):
        '''close the console, and exit:  QUIT'''
        print('Thank you for using hbnb console')
        self.close()
        return True
        pass

    ''' ----- record and playback -----'''

    def do_record(self, arg):
        'Save future commands to filename:  RECORD David.cmd'
        self.file = open(arg, 'w')

    def do_playback(self, arg):
        'Playback commands from a file:  PLAYBACK David.cmd'
        self.close()
        with open(arg) as f:
            self.cmdqueue.extend(f.read().splitlines())

    def precmd(self, line):
        line = line.lower()
        if self.file and 'playback' not in line:
            print(line, file=self.file)
        return line

    def close(self):
        if self.file:
            self.file.close()
            self.file = None


if __name__ == '__main__':
    Hbnb().cmdloop()
