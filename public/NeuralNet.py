import numpy as np
import copy
from random import sample

LEARNING_RATE = 0.01
LEARNING_RATE_MINIMUM = 0.00001
GAMMA = 0.9999
L1_N = 20

DATA = {
    'WEIGHTS': [np.random.random((L1_N, 9)), np.random.random((3, L1_N))],
    'BIASES': [np.random.random(L1_N), np.random.random(3)],
    'TRAINING_DATA': [],
    'TEST_DATA': [],
    'TRAINING_ERROR': 0.0,
    'TEST_ERROR': 0.0
}


def generate_n_training_games(n: int):
    """Generate n tic tac toe games randomly and store them in the array of training data"""
    global DATA
    for i in range(0, n):
        game, label = generate_game()
        DATA['TRAINING_DATA'].append({'game': game, 'label': label, 'predicted_class': None, 'output_layer': None})
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
        game[i] = np.random.random() / 2 + 0.5  # random between .5 - 1 to eliminate values near 0
        if idx % 2:
            game[i] *= -1
        status = get_game_status(game)
        if status is not None:
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


def activation(x, l):
    """
    :param x: vector of values
    :param l: which layer the values are from

    This function applies the appropriate activation to values for a given layer depending on the activation specified for that layer
    """
    if l == 0:
        return np.maximum(x, 0)
    elif l == 1:
        return stable_softmax(x)
    else:
        raise NotImplemented


# used as reference https://deepnotes.io/softmax-crossentropy
def stable_softmax(x):
    """
    :param x: vector of output node values
    :return:
    """
    exps = np.exp(x - np.max(x))
    return exps / np.sum(exps)


# used as reference https://deepnotes.io/softmax-crossentropy
def loss(z, l):
    """
    z is the vector of normalized output node values
    l is the vector of true labels (num_examples x 1)
    """
    m = l.shape[0]
    log_likelihood = -np.log(z[range(m), l])
    loss = np.sum(log_likelihood) / m
    return loss


# used as reference https://deepnotes.io/softmax-crossentropy
def delta_loss(z, l):
    """
    z is the array of normalized output node values
    l is the vector of true labels (num_examples x 1)
    """
    m = l.shape[0]
    grad = z.copy()
    grad[range(m), l] -= 1
    grad = grad.sum(axis=0)
    return grad / m


def sf(games):
    """
    :param games: the list of games to be classified using the Neural Net
    """
    global DATA

    weights = DATA['WEIGHTS']
    biases = DATA['BIASES']
    nodes = [np.zeros((len(games), w.shape[0])) for w in weights]

    for idx, g in enumerate(games):
        n = np.asarray(g['game'])
        for jdx, w in enumerate(weights):
            b = biases[jdx]
            n_next = n @ w.transpose() + b
            nodes[jdx][idx] = activation(n_next, jdx) # pass through appropriate function for the layer
            n = n_next
        g['predicted_class'] = np.argmax(n)
    return nodes


def bp(games, nodes):
    """Calculate the loss gradients with respect to network weights and update weights accordingly"""
    global DATA
    global LEARNING_RATE

    x = np.asarray([g['game'] for g in games])
    w = DATA['WEIGHTS']
    b = DATA['BIASES']

    # will need labels as 1 hot encoded vectors
    labels = np.asarray([g['label'] for g in games])
    l_1_hot = np.zeros((labels.size, 3))
    l_1_hot[np.arange(labels.size), labels] = 1

    # Notation: i = layer, j = node in layer, k = input weight to that node
    #           N = node/neuron value so Ni,j is jth node of ith layer
    #           W = 3-D Weight matrix, W1 is the matrix of weights feeding into second layer (L1), W1,j,k is the weight
    #               connecting the kth node of the first layer (L0) to the jth node of the second layer

    # We need dL/dWi,j,k and will updated Wi,j,k by - Learning Rate * dL/dWi,j,k
    # Note that dL/dN1,j = 0 for all j != t where t = true_class given the cross entropy loss function
    # The delta_loss function makes use of this fact and returns dL/dN1,t, as we can assume that dL/dN1,j = 0 for j != t
    # delta_loss = dL/dN1,t = (dL/dZt)*(dZt/dN1,t)
    # and given N1,j = N0*Wi + b1 = ... + N0,k*W1,j,k + ... + b1,j -> dN1j/dW1,j,k = N0,k and dN1j/dB1,j = 1

    # For i = 1 (output layer), dL/dW1,t,k = (dL/dZj)*(dZj/dN1,j)*(dN1,j/dW1,j,k)
    #                                    = (dL/dN1,j)*(dN1,j/dW1,j,k)
    #                                    = delta_loss * N0,k
    # where Zi is the activated value, and L is cross entropy loss.
    z = nodes[1]
    dL_dN1 = delta_loss(z, labels)
    dL_dW1 = dL_dN1.reshape((3, 1)) * np.average(nodes[0], axis=0).reshape((1, L1_N))
    dL_dB1 = dL_dN1

    # For i = 0
    # dL/dW0,j,k = (dL/dN1,t)*(dN1,t/dN0,j)*(dN0,j/dW0,j,k)
    #            = dL/dN1,t * W1,t,j * xk
    # dN1,t/dN0,j = W1,t,j      dN0,j/dB0,j = 1   dN0,j/dW0,j,k = xk (for linear activation only!)

    dL_dN1_t = l_1_hot * dL_dN1.reshape((1, 3))
    W1 = dL_dN1_t @ w[1]
    temp_x = x[:,np.newaxis,:]
    temp_w = W1[:,:,np.newaxis]
    temp_dL_dW0 = temp_w * temp_x

    dL_dW0 = np.average(temp_dL_dW0, axis=0)
    dL_dB0 = np.average(W1, axis=0)

    # update weight wij by -dL/dWij * learning rate
    w[1] -= LEARNING_RATE * dL_dW1
    b[1] -= LEARNING_RATE * dL_dB1

    w[0] -= LEARNING_RATE * dL_dW0
    b[0] -= LEARNING_RATE * dL_dB0

    # shrink learning rate
    LEARNING_RATE = max(LEARNING_RATE_MINIMUM, LEARNING_RATE * GAMMA)

def train(epoch: int):
    """Train network"""
    global DATA

    w_before = copy.deepcopy(DATA['WEIGHTS'])

    for i in range(epoch):
        batch = sample(DATA['TRAINING_DATA'], 10)
        nodes = sf(batch)
        bp(batch, nodes)

    w_after = copy.deepcopy(DATA['WEIGHTS'])

    change = w_before[0] - w_after[0]
    print(change)
    # Classify all games
    sf(DATA['TEST_DATA'] + DATA['TRAINING_DATA'])

    if DATA['TRAINING_DATA']:
        correct = sum([1 for g in DATA['TRAINING_DATA'] if g['label'] == g['predicted_class']])
        DATA['TRAINING_ERROR'] = correct / len(DATA['TRAINING_DATA'])
    if DATA['TEST_DATA']:
        correct = sum([1 for g in DATA['TEST_DATA'] if g['label'] == g['predicted_class']])
        DATA['TEST_ERROR'] = correct/ len(DATA['TEST_DATA'])

    return f'Completed {epoch} iterations of backpropagation and forward propagation'