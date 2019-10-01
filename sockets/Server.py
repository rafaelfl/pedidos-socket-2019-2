import socket
import time
HOST = ''              
PORT = 5000   
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
orig = (HOST, PORT)
tcp.bind(orig)
tcp.listen(1)
print 'Server is ready'

while True:
    con, cliente = tcp.accept()
    print 'Conectado por', cliente

    msg1 = '\t\t Menu\n\t1. hamburguer\n\t2. batata\n\t3. combo\n\t4. refri\n\nPara escolher digite o numero referente ao pedido: '
    con.send(msg1)
    while True:
        msg = con.recv(1024)
        if msg in ['1','2','3','4']:
            msg2 =  'Seu pedido esta sendo preparado\n'
            con.send(msg2)
            #time.sleep(5)
            msg2 =  'Seu pedido esta sendo enviado\n'
            con.send(msg2)
            break
        if msg == "X": break
        else:
            msg2 = 'O pedido inserido nao esta no menu\n'
            con.send(msg2)
            con.send(msg1)
        
        print cliente, msg
    print 'Finalizando conexao do cliente', cliente
    con.close()
tcp.close()
