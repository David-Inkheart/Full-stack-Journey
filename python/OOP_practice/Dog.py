class Dog:
    def __init__(self, name="", height=0, weight=0):
        self.name = name
        self.height = height
        self.weight = weight

    def run(self):
        print("{} The dog runs".format(self.name))

    def eat(self):
        print("{} The dog eats".format(self.name))

    def bark(self):
        print("{} The dog barks".format(self.name))


def main():
    spot = Dog("Spot", 66, 26)

    spot.bark()

    bowser = Dog()

    bowser.bark()

main()
