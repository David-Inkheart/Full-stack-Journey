'''
Another sample test
'''

import unittest

class NumbersTest(unittest.TestCase):

    def test_even(self):
        '''
        Test that numbers between 0 and 5 are all even.
        '''
        for num in range(0, 6):
            with self.subTest(num=num):
                self.assertEqual(num % 2, 0)

if __name__ == '__main__':
    unittest.main()
