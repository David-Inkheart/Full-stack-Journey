class Animal:

    def __init__(self, birthType="Unknown",
                appearance="Unkownn", blooded="Unknown"):
        self.birth = birthType
        self.appearnce = appearance
        self.blooded = blooded

    @property
    def birthType(self):
        return self.__birthType

    @birthType.setter
    def birthType(self, birthType):
        self.__birthType = birthType

   @property
    def appearance(self):
        return self.__appearance

    @appearance.setter
    def appearance(self, appearance):
        self.__appearnce = appearance

   @property
    def blooded(self):
        return self.__blooded

    @birthType.setter
    def blooded(self, blooded):
        self.__blooded = blooded

    def __str__(self):
        return "A {} is {}, it is {} it is {}".format(type(self).__name__,
                                self.birthType, self.appearnce, self.blood)



