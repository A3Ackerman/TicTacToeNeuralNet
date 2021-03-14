import numpy as np

DATA = {'WEIGHTS': np.random.random((3, 9)), 'BIASES': np.random.random(3), 'TRAINING_DATA': [], 'TEST_DATA': []}

LEARNING_RATE_INITIAL = 0.01
LEARNING_RATE_MINIMUM = 0.0001


def generate_n_training_games(n: int):
    global DATA
    for i in range(0, n):
        game, label = generate_game()
        DATA['TRAINING_DATA'].append({'game': game, 'label': label, 'predicted_class': None})
    return f'Randomly generated {n} games and added to Training Dataset'


def generate_n_test_games(n: int):
    global DATA
    for i in range(0, n):
        game, label = generate_game()
        DATA['TEST_DATA'].append({'game': game, 'label': label, 'predicted_class': None})
    return f'Randomly generated {n} games and added to Test Dataset'


def generate_game():
    game = [None] * 9
    order = list(range(9))
    np.random.shuffle(order)
    for idx, i in enumerate(order):
        game[i] = np.random.random() / 2
        if idx % 2: game[i] += 0.5
        status = get_game_status(game)
        if not status is None:
            return game, status


def get_game_status(squares):
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
            return 0
        elif squares[a] >= 0.5 and squares[b] >= 0.5 and squares[c] >= 0.5:
            return 2
    if None in squares:  # still open squares to play on
        return None
    else:
        return 1


def activation_function(z):
    return z


def sweep_forward():
    games = DATA['TRAINING_DATA'] + DATA['TEST_DATA']
    for g in games:
        # z = DATA['WEIGHTS'] * g['game']
        #sigma = activation_function(z, )
        #l = sigma + DATA['BIASES']
        g['predicted_class'] = 0


def back_propogate():
    pass


def train(epoch: int):
    for i in range(epoch):
        sweep_forward()

generate_n_training_games(5)
sweep_forward()