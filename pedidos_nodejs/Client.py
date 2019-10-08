import socket
HOST = '127.0.0.1'
PORT = 4000
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
dest = (HOST, PORT)
tcp.connect(dest)
print tcp.recv(1024)

print 'Para sair digite X\n'
msg = raw_input()
while msg != 'X':
    tcp.send(msg)
    rcv = tcp.recv(1024)
    print rcv

    if rcv == 'Seu pedido esta sendo preparado\n':
        rcv = tcp.recv(1024)
        print rcv

    msg = raw_input()

tcp.close()