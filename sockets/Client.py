import socket
HOST = '127.0.0.1'
PORT = 5000
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
dest = (HOST, PORT)
tcp.connect(dest)
print tcp.recv(1024)

print 'Para sair digite X\n'
msg = raw_input()
while msg != 'X':
    tcp.send(msg)
    print tcp.recv(1024)
    msg = raw_input()

tcp.close()