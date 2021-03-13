import numpy as np


WEIGHTS = np.random.random((3, 9))
BIASES = np.random.random(3)
LEARNING_RATE_INITIAL = 0.01
LEARNING_RATE_MINIMUM = 0.0001


def classify_game(g):
    game = np.fromarrays(g)
    liklihoods = np.sum(game * WEIGHTS) + BIAS



def generate_n_games(n: int):
    games = []
    for i in range(0, n):
        games.append(generate_game())
    return games

def generate_game():
    game = [None] * 9
    order = list(range(9))
    np.random.shuffle(order)
    for idx, i in enumerate(order):
        game[i] = np.random.random()/2
        if idx % 2: game[i] += 0.5
        if is_won(game):
            break
    return game

def is_won(squares):
    lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]

    for l in lines:
        a, b, c = l
        if not squares[a] or not squares[b] or not squares[c]:
            continue  # skip loop if any of the cells in the line are empty
        if squares[a] < 0.5 and squares[b] < 0.5 and squares[c] < 0.5:
          return True
        elif squares[a] >= 0.5 and squares[b] >= 0.5 and squares[c] >= 0.5:
          return True
    return False

def sweep_forward():
    pass


def back_propogate():
    pass


def train(epoch: int):
    for _ in range(epoch):
        sweep_forward()
        back_propogate()