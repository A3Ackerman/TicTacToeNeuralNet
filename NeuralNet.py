import numpy as np


WEIGHTS = np.random.random((3, 10))
LEARNING_RATE_INITIAL = 0.01
LEARNING_RATE_MINIMUM = 0.0001


def sweepForward():
    pass


def backPropogate():
    pass


def train(epoch: int):
    for _ in range(epoch):
        sweepForward()
        backPropogate()