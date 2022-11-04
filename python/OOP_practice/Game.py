import random 
import math

'''
SAMPLE OUTPUT FOR GAME

Sam attacks Paul and deals 9 damage
Paul is down to 10 health
Paul attacks Sam and deals 7 damage
Sam is down to 7 health
Sam attacks Paul ans deals 19 damage
Paul is down to -9 health
Paul has died and Sam is victorious
Game over
'''
# SOLUTION PROCESS FLOW

# Warrior and Battle class
# Warriors will have names, health, attack and block maximums
class Warrior:

    def __init__(self, name="Warrior", health=0, attkMax=0, blockMax=0):
        self.name = name
        self.health = health
        self.attkMax = attkMax
        self.blockMax = blockMax

# They will have the capabilities(methods) to attack and block random amounts

# Attack will use random() 0.0 to 1.0 * maxAttack + .5 (to shorten game duration)

# Block will use random()

    def attack(self):
        attkAmt = self.attkMax * (random.random() + 0.5)

        return attkAmt

    def block(self):
        blockAmt = self.blockMax * (random.random() + 0.5)

        return blockAmt

# Battle class will have the method of looping until 1 warrior dies
# Warriors will each get a turn to attack each other

class Battle:
    def startFight(self, warrior1, warrior2):
        
        while True:
            if self.getAttackResult(warrior1, warrior2) == "Game Over":
                print("Game Over")
                break
            if self.getAttackResult(warrior2, warrior1) == "Game Over":
                print("Game Over")
                break

# Function gets 2 warriors
# One warrior attacks the other
# Attack and Blocks will be integers

    @staticmethod
    def getAttackResult(warriorA, warriorB):
        
        warriorAAttkAmt = warriorA.attack()

        warriorBBlockAmt = warriorB.block()

        damage2WarriorB = math.ceil(warriorAAttkAmt - warriorBBlockAmt)

        warriorB.health = warriorB.health - damage2WarriorB

        print("{} attacks {} and deals {} damage". format(warriorA.name,
                warriorB.name, damage2WarriorB))

        print("{} is down to {} health".format(warriorB.name,
                warriorB.health))

        if warriorB.health <= 0:
            print("{} has Died and {} is Victorious".format(warriorB.name,
            warriorA.name))
            return "Game Over"
        else:
            return "Fight Again"


def main():

    david = Warrior("David", 50, 20, 10)

    goliath = Warrior("Goliath", 50, 20, 10)

    battle = Battle()

    battle.startFight(david, goliath)

main()
