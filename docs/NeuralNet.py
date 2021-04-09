import numpy as np

DATA = {'WEIGHTS': np.random.random((3, 9)), 'BIASES': np.random.random(3),
        'TRAINING_DATA': [], 'TEST_DATA': [], 'TRAINING_ERROR': 0, 'TEST_ERROR': 0}

LEARNING_RATE = 0.1
LEARNING_RATE_MINIMUM = 0.01
GAMMA = 0.99999

def generate_n_training_games(n: int):
    """Generate n tic tac toe games randomly and store them in the array of training data"""
    global DATA
    for i in range(0, n):
        game, label = generate_game()
        DATA['TRAINING_DATA'].append({'game': game, 'label': label, 'predicted_class': None, 'class_scores': None})
    return f'Randomly generated {n} games and added to Training Dataset'


def generate_n_test_games(n: int):
    """Generate n tic tac toe games randomly and store them in the array of test data"""
    global DATA
    for i in range(0, n):
        game, label = generate_game()
        DATA['TEST_DATA'].append({'game': game, 'label': label, 'predicted_class': None})
    return f'Randomly generated {n} games and added to Test Dataset'


def generate_game():
    """Generate tic tac toe games by selecting moves at random"""
    game = [0] * 9
    order = list(range(9))
    np.random.shuffle(order)
    for idx, i in enumerate(order):
        game[i] = np.random.random()
        if idx % 2: game[i] *= -1
        status = get_game_status(game)
        if not status is None:
            return game, status


def get_game_status(squares):
    '''
    Classify game using an algorithm, or return None if game is incomplete
    :param squares: array of numbers representing a tic tac toe game
    '''
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
        if squares[a] < 0 and squares[b] < 0 and squares[c] < 0:
            return 0
        elif squares[a] >= 0 and squares[b] >= 0 and squares[c] >= 0:
            return 2
    if 0 in squares:  # still open squares to play on
        return None
    else:
        return 1

# used as reference https://deepnotes.io/softmax-crossentropy
def stable_softmax(a):
    """
    :param a: the vector Wxi + b for a particular observation xi
    :return:
    """
    exps = np.exp(a - np.max(a))
    return exps / np.sum(exps)


# used as reference https://deepnotes.io/softmax-crossentropy
def loss(z, l):
    """
    z is the output from fully connected layer, passed through the activation function (num_examples x num_classes)
    l is labels (num_examples x 1)
    """
    m = l.shape[0]
    log_likelihood = -np.log(z[range(m), l])
    loss = np.sum(log_likelihood) / m
    return loss


# used as reference https://deepnotes.io/softmax-crossentropy
def delta_loss(z, l):
    """
    z is the output from fully connected layer, passed through the activation function (num_examples x num_classes)
    l is labels (num_examples x 1)
    """
    m = l.shape[0]
    grad = z.copy()
    grad[range(m), l] -= 1
    grad = grad.sum(axis=0)
    return grad/m

def sweep_forward():
    """Perform a forward pass of the neural network, storing results in the global variables"""
    global DATA
    games = DATA['TRAINING_DATA'] + DATA['TEST_DATA']
    w = DATA['WEIGHTS']
    b = DATA['BIASES']
    for g in games:
        wx = g['game'] * w
        a = wx.sum(axis=1) + b
        z = stable_softmax(a)
        g['class_scores'] = z
        g['predicted_class'] = np.argmax(z)
    if DATA['TRAINING_DATA']:
        DATA['TRAINING_ERROR'] = sum([1 for g in DATA['TRAINING_DATA'] if g['label'] == g['predicted_class']]) / len(DATA['TRAINING_DATA'])
    if DATA['TEST_DATA']:
        DATA['TEST_ERROR'] = sum([1 for g in DATA['TEST_DATA'] if g['label'] == g['predicted_class']]) / len(DATA['TEST_DATA'])


def backpropagate():
    """Calculate the loss gradients with respect to network weights and update weights accordingly"""
    global DATA
    global LEARNING_RATE
    games = DATA['TRAINING_DATA']
    x = np.asarray([g['game'] for g in games])
    l = np.asarray([g['label'] for g in games])
    z = np.array([g['class_scores'] for g in games])

    # Need dL/dWij = (dL/dZi)*(dAi/dAi)*(dZ/dWij) to update Weights
    # where Ai is the output of the NN for class i, Zi is the activated value, and L is cross entropy loss
    # delta_loss gives the array of dL/dAi = (dL/dZi)*(dZi/dAi) where i denotes the class
    dL = delta_loss(z, l) # dL/dA
    ls = loss(z, l)

    # Zi = xWi + bi = ... + xj*Wij + ...
    # dZi/dWij = xj, dZi/dBi = 1
    # dL/dWij = xj*dL/dAi, dL/dBi = dL/dAi
    dldw = dL.reshape((3, 1)) * np.average(x, axis=0).reshape((1, 9))
    dldb = dL

    # update weight wij by -dL/dWij * learning rate
    dldw *= LEARNING_RATE
    dldb *= LEARNING_RATE
    DATA['WEIGHTS'] -= dldw
    DATA['BIASES'] -= dldb
    LEARNING_RATE = max(LEARNING_RATE_MINIMUM, LEARNING_RATE*GAMMA)


def train(epoch: int):
    """Train network"""
    for i in range(epoch):
        sweep_forward()
        backpropagate()
    return f'Completed {epoch} iterations of backpropagation and forward propagation'
